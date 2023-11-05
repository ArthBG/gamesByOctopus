"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { fetchAsyncGames } from '@/data/gamedata';
import styles from './page.module.css';
import Header from './components/header/header';
import GameList from './components/gameDetails/GameList';
import NewGame from '@/models/Jogo';
import NewGameList from '@/models/JogoLista';
import ErrorMsg from './components/errormsg/ErrorMsg';
import { ColorRing } from 'react-loader-spinner';
import Header2 from './components/header2/page';
import ScrollButton from './components/scrollbutton/ScrollButton';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
// no terminal npm install react-loader-spinner --save , npm install react-icons --save, npm install next/image --save, npm install

const itemsPerPage = 10;
const gamelist = new NewGameList();
function Home() {
  const [msg, setMsg] = useState(false);
  const [url, setUrl] = useState(false);
  const [flag, setFlag] = useState(0);
  const [editbtn, setEditbtn] = useState(false);
  const [divGames, setDivGames] = useState(true);
  const [divInput, setDivInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newGameList, setNewGameList] = useState(gamelist.getGames());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStore, setSelectedStore] = useState('all');
  const [name, setname] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [store, setStore] = useState('');
  const lowerSearch = search.toLowerCase();
  const [allGames, setAllGames] = useState(null);
  const [HolyGames, setHolyGames] = useState([]);

  function validation() {
    if (name == '' || platform == '' || genre == '' || date == '' || image == '') {
      return false;
    } else {
      return true;
    }
  }

  const URLInvalida = (image) => {
    console.log("entrou no image", image)
    if (image.endsWith(".jpg") || image.endsWith(".png") || image.endsWith(".gif") || image.endsWith(".jpeg")) {
      console.log('passou');
      return true;
    } else {
      return false
    }

  }
  const submitGame = () => {
    const randomId = Math.floor(Math.random() * 100000);
    const platformSplited = typeof platform === 'string' ? platform.split(',') : [platform];
    const genreSplited = typeof genre === 'string' ? genre.split(',') : [genre];
    const storeSplited = typeof store === 'string' ? store.split(',') : [store];
    const rating = '';
    const newGame = new NewGame(randomId, name, platformSplited, genreSplited, date, image, rating, storeSplited);
    let indica = false;
    if (validation() == false) {
      setMsg(true)
      setTimeout(() => {
        setMsg(false)
      }, 3000);
    } else if (!URLInvalida(image)) {
      console.log('entrou aqui no imagem URL', image)
      setUrl(true)
      setTimeout(() => {
        setUrl(false)
      }, 3000);
    } else {

      if (!newGameList.some((game) => game.name === newGame.name)) {
        const updatedGame = [...newGameList, newGame];
        setNewGameList(updatedGame);
        indica = true;
        clearInfos();
        changeDisplay();
      }
      if (indica) {
        gamelist.addNewGame(newGame);
        setHolyGames(gamelist.getGames());
      }
    }
    uniqueGenres();
    uniquePlatforms();
    uniqueStores();

  }

  const removeGames = (id) => {
    gamelist.removeGame(id);
    setNewGameList(gamelist.getGames());
    setHolyGames(gamelist.getGames());
  }

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        setLoading(true);

        let allGameData = [];
        let currentPage = 1;
        while (allGameData.length < 50) {
          const response = await fetchAsyncGames(currentPage);
          allGameData = [...allGameData, ...response.results];
          currentPage++;
        }
        const visibleGames = allGameData.slice(0, itemsPerPage);
        setAllGames(visibleGames);
        gamelist.demonMethod(allGameData);
        setHolyGames(gamelist.getGames());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  useEffect(() => {
    if (allGames && allGames.data) {
      allGames.data.map((game) => {
        const newGame = new NewGame(game.name, game.parent_platforms, game.genres, game.released, game.rating, game.background_image, game.stores);
        gamelist.addNewGame(newGame);
      });
      const newGamesUpdated = [...newGameList, ...gamelist.getGames()];
      setNewGameList(newGamesUpdated);
      setNewGameList(gamelist.getGames());
      setHolyGames(gamelist.getGames());
    }
  }, [allGames]);

  useEffect(() => {
    const filteredGames = filterGames();
    const searchedGames = handleSearch();
  
    // Calcular o índice dos primeiros e últimos itens na página
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    // Selecionar os jogos visíveis com base nas páginas a partir dos jogos pesquisados
    const searchedVisibleGames = searchedGames.slice(indexOfFirstItem, indexOfLastItem);
  
    // Se houver jogos pesquisados, defina HolyGames para esses jogos, caso contrário, use os jogos filtrados
    if (searchedVisibleGames.length > 0) {
      setHolyGames(searchedVisibleGames);
    } else {
      const visibleGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
      setHolyGames(visibleGames);
    }
  }, [selectedPlatform, selectedGenre, selectedStore, HolyGames, page]);

  const nextPage = () => {
    if (page >= newGameList.length / itemsPerPage) {
      return;
    }
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const paginate = () => {
    const pageNumbers = [];
    // math.ceil arredonda o numero para cima
    for (let i = 1; i <= Math.ceil(newGameList.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    //quero que exiba os 2 primeiros e os 2 ultimos
    const firstPages = pageNumbers.slice(0, 2);
    const lastPages = pageNumbers.slice(-2);
    const middlePages = pageNumbers.slice(page - 1, page + 1);
    const allPages = [...firstPages, ...middlePages, ...lastPages];
    const uniquePages = [...new Set(allPages)];
    return uniquePages.map((number) => {
      return (
        <button
          key={number}
          className={styles.pagesbtn}
          onClick={() => setPage(number)}
        >
          {number}
        </button>
      );
    });
  
  };
  const filterGames = () => {
    let filteredGames = newGameList;


    if (selectedPlatform !== 'all') {
      filteredGames = filteredGames.filter((game) => {
        return game.platforms.includes(selectedPlatform);
      });
    }

    if (selectedStore !== 'all') {
      filteredGames = filteredGames.filter((game) => {
        return game.stores.includes(selectedStore);
      });
    }

    if (selectedGenre !== 'all') {
      filteredGames = filteredGames.filter((game) => {
        return game.genres.includes(selectedGenre);
      });
    }
    return filteredGames;

  }
  const handleSearch = () => {
    const filteredGames = filterGames();
  
    const filterSearchedGames = filteredGames.filter((game) => {
      return game.name.toLowerCase().includes(lowerSearch);
    });
  
    return filterSearchedGames;
  };

  const uniqueGenres = () => {
    const allGenres = gamelist.getGames().map((game) => {
      if (Array.isArray(game.genres)) {
        return game.genres;
      }
      return [];
    });
    const flatGenres = allGenres.flat();
    const uniqueGenres = [...new Set(flatGenres.sort())];
    return uniqueGenres;
  };

  const uniquePlatforms = () => {
    const allPlatforms = gamelist.getGames().map((game) => {
      if (Array.isArray(game.platforms)) {
        return game.platforms;
      }
      return [];
    });
    const flatPlatforms = allPlatforms.flat();
    const uniquePlatforms = [...new Set(flatPlatforms.sort())];
    return uniquePlatforms;
  };

  const uniqueStores = () => {
    //setSelectedPlatform('Android');

    const allStores = gamelist.getGames().map((game) => {
      if (Array.isArray(game.stores)) {
        return game.stores;
      }
      return [];
    });
    const flatStores = allStores.flat();
    const uniqueStores = [...new Set(flatStores.sort())];
    return uniqueStores;
  }

  const changeDisplay = () => {
    setDivGames(!divGames);
    setDivInput(!divInput);
  }



  const clearFilters = () => {
    setSelectedPlatform('all');
    setSelectedGenre('all');
    setSelectedStore('all');
    setSearch('');
  };
  const clearInfos = () => {
    setname('');
    setPlatform('');
    setGenre('');
    setDate('');
    setStore('');
    setImage('');
  }  
  


  const updateGame = () => {
    // flat() transforma um array de arrays em um array só
    const platformSplited = typeof platform === 'string' ? platform.split(',') : [platform].flat();
    const genreSplited = typeof genre === 'string' ? genre.split(',') : [genre].flat();
    const storeSplited = typeof store === 'string' ? store.split(',') : [store].flat();
    gamelist.updateNewGame(flag, name, platformSplited, genreSplited, date, image, storeSplited);
    console.log('entrou no update');
    console.log(gamelist.getGames());
    setNewGameList(gamelist.getGames());
    setHolyGames(gamelist.getGames());
    setEditbtn(false);
    clearInfos();
    changeDisplay();
  }

  const editGame = (id) => {
    const game = gamelist.getNewGamePorId(id);
    setname(game.name);
    setDate(game.released);
    setImage(game.background_image);
    setPlatform(game.platforms);
    setGenre(game.genres);
    setStore(game.stores);


    changeDisplay();
    setEditbtn(true);
    setFlag(id);
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header changeDisplay={changeDisplay} />
      </div>
      <div className={styles.header2}>
        <Header2 changeDisplay={changeDisplay} />
      </div>
      <div className={styles.container} style={{ display: divGames ? 'block' : 'none' }} value={divGames}>
        <div className={styles.logoOctopus}>
          {/* <Image src='/LOGO-octopusBlack.png' width={150} height={130}></Image> */}
          <h1 className={styles.tituloprincipal}>OctoPlay</h1>
        </div>
        <div className={styles.divinput}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Pesquise um jogo"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <button className={styles.searchbtn}>
          <FiSearch className={styles.icon} onClick={handleSearch} />
          </button>
        </div>
        <div className={styles.allselect}>
          <select
            className={styles.select}
            value={selectedPlatform}
            onChange={(ev) => setSelectedPlatform(ev.target.value)}
          >
            <option value="all" className={styles.op}>Filtre pela plataforma:</option>
            {
              uniquePlatforms().map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))
            }

          </select>
          <select
            className={styles.select}
            value={selectedGenre}
            onChange={(ev) => setSelectedGenre(ev.target.value)}
          >
            <option value="all" className={styles.op}>Ordenar por gênero:</option>
            {uniqueGenres().map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={selectedStore}
            onChange={(ev) => setSelectedStore(ev.target.value)}
          >
            <option value="all">Ordenar por loja:</option>
            {uniqueStores().map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.btnazul}>
          <button className={styles.button} onClick={clearFilters}>
            Redefinir Filtros
          </button>
        </div>
        <div className={styles.loaderdiv}>
          {loading && (
            <div className={styles.loader}>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#1E90FF', '#0000FF', '#	000000', '#	2F4F4F', '#	B0E0E6']}
              />
            </div>
          )}
        </div>
        <div className={styles.containerGames} >
          <GameList games={HolyGames} removeGame={removeGames} editGame={editGame} />
        </div>
        <div className={styles.paginate}>
          {paginate()}
        </div>
        <div className={styles.paginatediv}>
          <div className={styles.paginatebtn}>
            <button className={styles.pagesbtn} onClick={previousPage}>
              <IoIosArrowBack className={styles.icons} />
            </button>
            <button className={styles.pagesbtn} onClick={nextPage}>
              <IoIosArrowForward className={styles.icons} />
            </button>
            <p>
              Pagina {page} de {Math.ceil(newGameList.length / itemsPerPage)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.scrollbtn}>
        <ScrollButton />
      </div>
      <div className={styles.containerInputs} style={{ display: divInput ? 'block' : 'none' }} value={divInput}>
        <h1>Nome do Jogo</h1>
        <input
          className={styles.nameinput}
          type="text"
          value={name}
          onChange={(ev) => setname(ev.target.value)}
        />
        {
          msg ? (name == '' ? <ErrorMsg msg={"Preencha o nome do jogo"} /> : null) : null
        }

        <h1>Plataforma</h1>
        <input
          className={styles.nameinput}
          type="text"
          value={platform}
          onChange={(ev) => setPlatform(ev.target.value)}
        />
        {
          msg ? (platform == '' ? <ErrorMsg msg={"Preencha a plataforma"} /> : null) : null
        }
        <h1>Gênero</h1>
        <input
          className={styles.nameinput}
          type="text"
          value={genre}
          onChange={(ev) => setGenre(ev.target.value)}
        />
        {
          msg ? (genre == '' ? <ErrorMsg msg={"Preencha a gênero"} /> : null) : null
        }


        <h1>Data de lançamento</h1>

        <input
          className={styles.dateinput}
          type="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
        />
        {
          msg ? (date == '' ? <ErrorMsg msg={"Preencha a data "} /> : null) : null
        }
        <h1>URL da imagem</h1>
        <input
          className={styles.nameinput}
          type="text"
          value={image}
          onChange={(ev) => setImage(ev.target.value)}
        />
        {
          msg ? (image == '' ? <ErrorMsg msg={"Preencha a url do jogo"} /> : null) : null
        }
        {
          url ? (URLInvalida(image) ? null : <ErrorMsg msg={"URL inválida"} />) : null
        }
        <h1>Lojas</h1>
        <input
          className={styles.nameinput}
          type="text"
          value={store}
          onChange={(ev) => setStore(ev.target.value)}
        />
        {
          msg ? (store == '' ? <ErrorMsg msg={"Preencha a loja"} /> : null) : null
        }
        <button className={styles.button111} onClick={changeDisplay}>
          Voltar
        </button>

        {editbtn ? (
          <div className={styles.editcontainer}>
            <button className={styles.button11} onClick={updateGame}>
              Atualizar Jogo
            </button>
          </div>
        ) : (
          <button className={styles.button11} onClick={submitGame}>
            Adicionar Jogo
          </button>


        )}



      </div>
    </main>
  );
}


export default Home;
