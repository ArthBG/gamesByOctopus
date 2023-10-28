export default class NewGame {
    constructor(id, name, platforms, genres, released, background_image, rating) {
        this.id = id;
        this.name = name;
        this.platforms = platforms;
        this.genres = genres;
        this.released = released;
        this.background_image = background_image;
        this.rating = rating;
        console.log(NewGame);
    }
    generateId() {
        return Math.floor(Math.random() * 100000);
    }
}
