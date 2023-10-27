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
  const [msg, setMsg] = useState('');
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
    if (name.trim == '' || date.trim == '' || image.trim == '') {
      //console.log("n passou pelos inputs vazios");

      return false;
    }
    else {
      return true;
    }
  }

  const URLInvalida = (image) => {
    if (image.endsWith(".jpg") || image.endsWith(".png") || image.endsWith(".gif") || image.endsWith(".jpeg")) {
      return true;
    }
    return false;
  }

  const submitGame = () => {
    //console.log("Submit");
    const newGame = new NewGame(name, platform, genre, date, image);
    let indica = false;
    if (validation() == false) {
      //console.log('n passou pelas verificações');
      setMsg(true)
      setTimeout(() => {
        setMsg(false)
      }, 3000);
    } else if (URLInvalida(image) == false) {
      setUrl(true)
      setTimeout(() => {
        setUrl(false)
      }, 3000);
    } else {

      if (!newGameList.some((game) => game.name === newGame.name)) {
        const updatedGame = [...newGameList, newGame];
        setNewGameList(updatedGame);
        indica = true;
      }
      if (indica) {
        gamelist.addNewGame(newGame);
        setHolyGames(gamelist.getGames());
        setNewGameList(gamelist.getGames());
        clearInfos();
        changeDisplay();
      } else {

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
        while (allGameData.length < 150) {
          const response = await fetchAsyncGames(currentPage);
          allGameData = [...allGameData, ...response.results];
          currentPage++;
        }
        const visibleGames = allGameData.slice(0, itemsPerPage);
        setAllGames(visibleGames);
        gamelist.demonMethod(allGameData);
        setHolyGames(gamelist.getGames())
      } catch (error) {
        //     console.log(error);
      }
    };

    fetchAllGames();
  }, []);

  useEffect(() => {
    if (allGames && allGames.data) {
      allGames.data.map((game) => {
        const newGame = new NewGame(game.name, game.parent_platforms, game.genres, game.released, game.background_image);
        gamelist.addNewGame(newGame);
      });
      const newGamesUpdated = [...newGameList, ...gamelist.getGames()];
      setNewGameList(newGamesUpdated);
      setNewGameList(gamelist.getGames());
      setHolyGames(gamelist.getGames());
    }
  }, [allGames]);



  const filteredGames = () => {
    const filters = HolyGames.filter((game) => {
      const platformNames = game.platforms.map((platform) => platform.platform.name);
      const gameGenres = game.genres.map((genre) => genre.name);
      const platformFilter = selectedPlatform.length == 0 || selectedPlatform.some((selectedPlatform) => platformNames.includes(selectedPlatform));
      const genreFilter = selectedGenre == 'all' || gameGenres.includes(selectedGenre);
      const ratingFilter = selectedRating == 'all' || game.rating == selectedRating;


      return platformFilter && genreFilter && ratingFilter;
    });
    setHolyGames(filters);
  };



  useEffect(() => {
    filteredGames();
  }, [selectedPlatform, selectedGenre, selectedRating]);


  const uniqueGenres = () => {
    const allGenres = gamelist.getGames().map((game) => {
      if (Array.isArray(game.genres)) {
        return game.genres.map((genre) => genre.name);
      }
      return [];
    });
    const flatGenres = allGenres.flat();
    const uniqueGenres = [...new Set(flatGenres.sort())];
    return uniqueGenres;
  };

  const uniqueRatings = () => {
    const allRatings = gamelist.getGames().map((game) => game.rating);
    const uniqueRatings = [...new Set(allRatings.sort())];
    return uniqueRatings;
  };

  const handleSearch = () => {
    const filteredGames = gamelist.getGames().filter((game) => {
      return game.name.toLowerCase().includes(lowerSearch);
    });
    setHolyGames(filteredGames);
  };
  const handlePlatformChange = (event) => {
    const selectedPlatform = event.target.value;
    setPlatform((prevPlatforms) => {
      if (prevPlatforms.includes(selectedPlatform)) {
        return prevPlatforms.filter((platform) => platform !== selectedPlatform);
      } else {
        return [...prevPlatforms, selectedPlatform];
      }
    });
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setGenre((prevGenres) => {
      if (prevGenres.includes(selectedGenre)) {
        return prevGenres.filter((genre) => genre !== selectedGenre);
      } else {
        return [...prevGenres, selectedGenre];
      }
    });
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
  };
  const clearInfos = () => {
    setname('');
    setPlatform('');
    setGenre('');
    setDate('');
    setImage('');
  }



  const updateGame = () => {
    const platformSplited = typeof platform === 'string' ? platform.split(',') : [];
    const genreSplited = typeof genre === 'string' ? genre.split(',') : [];
    gamelist.updateNewGame(flag, name, platformSplited, genreSplited, date, image);
    setNewGameList(gamelist.getGames());
    setHolyGames(gamelist.getGames());
    setEditbtn(false);
    clearInfos();
    changeDisplay();
  }
  const formatDate = (date) => {
    if (!date) return '';

    const originalDate = new Date(date); // Converta a data original para um objeto Date
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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
          {/* {uniquePlatforms().map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>

          )) */}
        </select>
        <select
          className={styles.select}
          value={selectedGenre}
          onChange={(ev) => setSelectedGenre(ev.target.value)}
        >
          <option value="all">Ordenar por gênero:</option>
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
      <div className={styles.pagesbuttons}>
        <button className={styles.button} onClick={previousPage}>
          Página anterior
        </button>
        <button className={styles.button} onClick={nextPage}>
          Próxima página
        </button>
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
          name == "" ? <ErrorMsg msg={"Preencha o nome do jogo"} /> : null
        }
        {/* <h1>Plataforma</h1>
        <p>Selecione a plataforma:</p>
        {uniquePlatforms().map((platform) => (
          <div key={platform} className={styles.checkbox}>
            <input
              type="checkbox"
              value={platform}
              onChange={handlePlatformChange}
            />
            <label>{platform}</label>
          </div>
        ))
        }
        <h1>Gênero</h1>
        {
          uniqueGenres().map((genre) => (
            <div key={genre} className={styles.checkbox}>
              <input
                type="checkbox"
                value={genre}
                onChange={handleGenreChange}
              />
              <label>{genre}</label>
            </div>
          ))
        } */}
        <h1>Data de lançamento</h1>

        <input
          className={styles.dateinput}
          type="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
        />
        {
          date == "" ? <ErrorMsg msg={"Preencha o data de jogo"} /> : null
        }
        <h1>Imagem do jogo</h1>
        <input
          className={styles.imageinput}
          type="text"
          value={image}
          onChange={(ev) => setImage(ev.target.value)}
        />
        {
          image == "" ? <ErrorMsg msg={"Preencha a imagem do jogo"} /> : null
        }
        {
          image == "" ? <ErrorMsg msg={"Preencha a url do jogo"} /> : null
        }


        {editbtn ? (
          <div className={styles.editcontainer}>
            <h1>Plataformas</h1>
            <input className={styles.platform}
              type="text"
              value={platform}
              onChange={(ev) => setPlatform(ev.target.value)}
            />
            <h1>Gêneros</h1>
            <input className={styles.genre}
              type="text"
              value={genre}
              onChange={(ev) => setGenre(ev.target.value)}
            />
            <button className={styles.button} onClick={ updateGame}>
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
