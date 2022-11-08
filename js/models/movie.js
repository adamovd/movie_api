"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var Movie = /** @class */ (function () {
    function Movie(title, year, imageUrl, type) {
        this.title = title;
        this.year = year;
        this.imageUrl = imageUrl;
        this.type = type;
        parseInt(year);
        type.toUpperCase();
    }
    return Movie;
}());
exports.Movie = Movie;
