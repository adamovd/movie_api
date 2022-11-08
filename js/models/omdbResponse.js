"use strict";
exports.__esModule = true;
exports.OmdbResponse = void 0;
var OmdbResponse = /** @class */ (function () {
    function OmdbResponse(amount, movies) {
        this.amount = amount;
        this.movies = movies;
        //     movies.map((movie:Movie) => {
        //         return new Movie(movie.title, movie.year, movie.imageUrl, movie.type);
        // });
    }
    return OmdbResponse;
}());
exports.OmdbResponse = OmdbResponse;
