import NewGame from "./Jogo";
export default class NewGameList {
  constructor() {
    this.games = [];
  }

  // add games to the list
  demonMethod(lista) {
    lista.map((game) => {
      const id = game.id;
      const name = game.name;
      const platforms = game.parent_platforms.map((platform) => platform.platform.name);
      const genres = game.genres.map((genre) => genre.name);
      const released = game.released;
      const rating = game.rating; 
      const background_image = game.background_image;
      const stores = game.stores.map((store) => store.store.name);
      const newGamev = new NewGame(id, name, platforms, genres, released, background_image, rating, stores);
      this.addNewGame(newGamev);
  })

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
    console.log("Método de adicionar jogo");
    this.games.push(newGame);
  }

  removeGame(id) {
    this.games = this.games.filter(game => game.id !== id);
  }

  getGames() {
    return this.games;
  }

  getNewGamePorId(id) {
    return this.games.find(game => game.id === id);
  }

  updateNewGame(flag, name, platformSplited, genreSplited, date, image, stores) {
      const game = this.getNewGamePorId(flag);
      if(game) {
        game.name = name;
        game.platforms = platformSplited;
        game.genres = genreSplited;
        game.released = date;
        game.background_image = image;
        game.stores = stores;
      }

      return game;
    
  }


}
