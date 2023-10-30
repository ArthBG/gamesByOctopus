"use client";
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { fetchAsyncGames } from '@/data/gamedata';
import styles from './page.module.css';
import Header from './components/header/header';
import GameList from './components/gameDetails/GameList';
import NewGame from '@/models/Jogo';
import NewGameList from '@/models/JogoLista';
import ErrorMsg from './components/errormsg/ErrorMsg';

const itemsPerPage = 10;
const gamelist = new NewGameList();
function Home() {
  const [msg, setMsg] = useState(false);
  const [url, setUrl] = useState(false);
  const [flag, setFlag] = useState(0);
  const [editbtn, setEditbtn] = useState(false);
  const [divGames, setDivGames] = useState(true);
  const [divInput, setDivInput] = useState(false);
  const [newGameList, setNewGameList] = useState(gamelist.getGames());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [name, setname] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const lowerSearch = search.toLowerCase();
  const [allGames, setAllGames] = useState(null);
  const [HolyGames, setHolyGames] = useState([]);

  function validation() {
    console.log(name, platform, genre, date, image)
    if(name == '' || platform == '' || genre == '' || date == '' || image == ''){
      return false;
    }else{
            return true;
    }
  }

  const URLInvalida = (image) => {
    console.log("entrou no image", image)
    if (image.endsWith(".jpg") || image.endsWith(".png") || image.endsWith(".gif") || image.endsWith(".jpeg")) {
      console.log('passou');
      return true;
    } else{
      return false
    }

  }
  const submitGame = () => {
    const randomId = Math.floor(Math.random() * 100000);
    const newGame = new NewGame(randomId, name, platform, genre, date, image);
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

  }

  const removeGames = (id) => {
    // console.log(id);
    gamelist.removeGame(id);
    setNewGameList(gamelist.getGames());
    setHolyGames(gamelist.getGames());
  }
  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        let allGameData = [];
        let currentPage = 1;
        while (allGameData.length < 100) {
          const response = await fetchAsyncGames(currentPage);
          allGameData = [...allGameData, ...response.results];
          currentPage++;
        }
        const visibleGames = allGameData.slice(0, itemsPerPage);
        setAllGames(visibleGames);
        gamelist.demonMethod(allGameData);
        setHolyGames(gamelist.getGames())
      } catch (error) {
         console.log(error);
      }
    };

    fetchAllGames();
  }, []);

  useEffect(() => {
    if (allGames && allGames.data) {
      allGames.data.map((game) => {
        const newGame = new NewGame(game.name, game.parent_platforms, game.genres, game.released, game.rating, game.background_image);
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
    setHolyGames(filteredGames);
  }, [selectedPlatform, selectedGenre, selectedRating]);
  



  const filterGames = () => {
    let filteredGames = newGameList;
    if (selectedPlatform !== 'all') {
      filteredGames = filteredGames.filter((game) => {
        return game.platforms.includes(selectedPlatform);
      });
    }
    if (selectedGenre !== 'all') {
      filteredGames = filteredGames.filter((game) => {
        return game.genres.includes(selectedGenre);
      });
    }
    if (selectedRating !== 'all') {
      filteredGames = filteredGames.filter((game) => {
        return game.rating === Number(selectedRating);
      });
    }
    return filteredGames;

  }


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

  const uniqueRatings = () => {
    const allRatings = gamelist.getGames().map((game) => game.rating);
    const uniqueRatings = [...new Set(allRatings.sort())];
    return uniqueRatings;
  };

  const handleSearch = () => {
    const filterGames = gamelist.getGames().filter((game) => {
      return game.name.toLowerCase().includes(lowerSearch);
    });
    setHolyGames(filterGames);
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleGames = allGames.slice(startIndex, endIndex);
    setHolyGames(visibleGames);
  };


  const previousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      const startIndex = (newPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const visibleGames = allGames.slice(startIndex, endIndex);
      setHolyGames(visibleGames);
    }
  };
  const changeDisplay = () => {
    setDivGames(!divGames);
    setDivInput(!divInput);
  }



  const clearFilters = () => {
    setSelectedPlatform('all');
    setSelectedGenre('all');
    setSelectedRating('all');
    setSearch('');
  };
  const clearInfos = () => {
    setname('');
    setPlatform('');
    setGenre('');
    setDate('');
    setImage('');
  }



  const updateGame = () => {
    const platformSplited = typeof platform === 'string' ? platform.split(',') : [platform];
    const genreSplited = typeof genre === 'string' ? genre.split(',') : [genre];
    gamelist.updateNewGame(flag, name, platformSplited, genreSplited, date, image);
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

    changeDisplay();
    setEditbtn(true);
    setFlag(id);
  }

  const upScroll = () =>{
    window.scrollTo(0, 0);
  }
  const downScroll = () =>{
    window.scrollTo(0, 100000);
  }
  return (
    <main className={styles.main}>
      <Header changeDisplay={changeDisplay} />
      <div className={styles.container}>
        <h1>Games</h1>
        <div className={styles.divinput}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Pesquise um jogo"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <FiSearch onClick={handleSearch} />
        </div>
        <select
          className={styles.select}
          value={selectedPlatform}
          onChange={(ev) => setSelectedPlatform(ev.target.value)}
        >
          <option value="all">Filtre pela plataforma:</option>
          <option value="all">Todas</option>
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
          <option value="all">Ordenar por gênero:</option>
          <option value="all">Todos</option>
          {uniqueGenres().map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={selectedRating}
          onChange={(ev) => setSelectedRating(ev.target.value)}
        >
          <option value="all">Ordenar por avaliação:</option>
          <option value="all">Todas</option>
          {uniqueRatings().map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <button className={styles.button} onClick={clearFilters}>
          Redefinir Filtros
        </button>
        <div className={styles.containerGames} style={{ display: divGames ? 'block' : 'none' }} value={divGames}>
          <GameList games={HolyGames} removeGame={removeGames} editGame={editGame} />
        </div>
      </div>
      <div className={styles.scrollbtn}>
          <button className={styles.btnscroll} onClick={upScroll}>
            SETA PRA CIMA î
          </button>
          <button className={styles.btnscroll} onClick={downScroll}>
            SETA PRA BAIXO î
          </button>
        </div>    
      {/* <div className={styles.pagesbuttons}>
        <button className={styles.button} onClick={previousPage}>
          Página anterior
        </button>
        <button className={styles.button} onClick={nextPage}>
          Próxima página
        </button>
      </div> */}

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

        {editbtn ? (
          <div className={styles.editcontainer}>
            <button className={styles.button} onClick={updateGame}>
              Atualizar Jogo
            </button>
          </div>
        ) : (
          <button className={styles.button} onClick={submitGame}>
            Adicionar Jogo
          </button>


        )}
       


      </div>
    </main>
  );
}	


export default Home;
