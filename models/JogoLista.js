import NewGame from "./Jogo";
export default class NewGameList {
  constructor() {
    this.games = [];
  }

  demonMethod(lista) {
    lista.map((game) => {
      const id = game.id;
      const name = game.name;
      const platforms = game.parent_platforms.map((platform) => platform.platform.name);
      console.log("PLataformas");
      console.log(platforms);
      const genres = game.genres.map((genre) => genre.name);
      const released = game.released;
      const rating = game.rating; 
      const background_image = game.background_image;
      const newGamev = new NewGame(id, name, platforms, genres, released, background_image, rating);
      this.addNewGame(newGamev);
  })

    console.log(this.games);  

    this.angelMethod();

  }

  // exclude duplicate games
  angelMethod() {
    this.games = this.games.filter((game, index, self) =>
      index === self.findIndex((t) => (
        t.id === game.id
      ))
    )
  }

  addNewGame(newGame) {
    this.games.push(newGame);
  }

  removeGame(id) {
    const game = this.getNewGamePorId(id);
    console.log(game);
    this.games = this.games.filter(game => game.id !== id);
    console.log(this.games);
    return this.games;
  }

  getGames() {
    return this.games;
  }

  getNewGamePorId(id) {
    return this.games.find(game => game.id === id);
  }

  updateNewGame(flag, name, platformSplited, genreSplited, date, image) {
      const game = this.getNewGamePorId(flag);
      if(game) {
        game.name = name;
        game.platforms = platformSplited;
        game.genres = genreSplited;
        game.released = date;
        game.background_image = image;
      }

      return game;
    
  }


}
