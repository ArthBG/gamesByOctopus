export default class NewGame {
    constructor(id, name, platforms, genres, released, rating, background_image) {
        this.id = id;
        this.name = name;
        this.platforms = platforms;
        this.genres = genres;
        this.released = released;
        this.rating = rating;
        this.background_image = background_image;
    }
    generateId() {
        return Math.floor(Math.random() * 100000);
    }
}
