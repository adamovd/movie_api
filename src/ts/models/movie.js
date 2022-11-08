"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(title, year, imageUrl, type) {
        this.title = title;
        this.year = year;
        this.imageUrl = imageUrl;
        this.type = type;
        parseInt(year);
        type.toUpperCase();
    }
}
exports.Movie = Movie;
