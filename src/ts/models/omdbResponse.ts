import { Movie } from "./movie";


export class OmdbResponse {
    constructor(public amount:number, public movies: Movie[]) {
        //ingen ny lista med Movie-objekt skapas vad jag kan se
        movies.map((movie:Movie) => {
            return new Movie(movie.title, movie.year, movie.imageUrl, movie.type);
    });
}
}