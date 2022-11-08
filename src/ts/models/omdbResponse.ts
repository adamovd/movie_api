import { Movie } from "./movie";


export class OmdbResponse {
    constructor(public amount:number, public movies:[]) {
    //     movies.map((movie:Movie) => {
    //         return new Movie(movie.title, movie.year, movie.imageUrl, movie.type);
    // });
}
}