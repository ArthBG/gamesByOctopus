export default class NewGame {
    constructor(name, platform, genres, released, background_image) {
        console.log("Do input");
        console.log(genres);
        this.name = name;
        this.platform = platform;
        this.genres = genres;
        this.released = released;
        this.background_image = background_image;
        this.id = this.generateId();
    }
    generateId() {
        return Math.floor(Math.random() * 100000);
    }
}
