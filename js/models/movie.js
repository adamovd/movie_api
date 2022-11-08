"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var Movie = /** @class */ (function () {
    // year: number;
    function Movie(title, year, imageUrl, type) {
        this.title = title;
        this.year = year;
        this.imageUrl = imageUrl;
        this.type = type;
        // this.year = parseInt(year);
        // this.type.toUpperCase();
    }
    return Movie;
}());
exports.Movie = Movie;
//får felmeddelande på parseInt och toUpperCase, samt att det inte går att använda year i main.js
