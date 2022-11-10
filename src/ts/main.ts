import axios from "axios";
// import { Movie } from "./models/movie";
// import { OmdbResponse } from "./models/omdbResponse";
import { IOmdbResponse } from "./models/IOmdbResponse";
import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";

const startText:HTMLParagraphElement = document.createElement("p");
const searchContainer:HTMLDivElement = document.createElement("div");
const searchInput:HTMLInputElement = document.createElement("input");
const searchBtn:HTMLButtonElement = document.createElement("button");
const searchResult:HTMLParagraphElement = document.createElement("p");
const searchDiv:HTMLDivElement = document.createElement("div");
const movieContainer:HTMLDivElement = document.createElement("div");

searchInput.type = "text";
searchBtn.type = "submit";

startText.classList.add("start_text")
searchContainer.classList.add("search");
searchInput.classList.add("search__input");
searchBtn.classList.add("search__btn");
searchResult.classList.add("search__result");
searchDiv.classList.add("searchresult");
movieContainer.classList.add("movie");

searchBtn.innerHTML = "Search";
startText.innerHTML = `Welcome to this database of movies, that we encountered on our mission to Earth 6782. </br>
</br>
On our journey through the multiverse we found a version of earth where they no longer watch movies on VHS, but use something called "streaming". </br>
</br>
We managed to get access to all the different movies they've produced on this earth and turned them into VHS's for you to buy or rent. </br>
</br>
We ship to every planet and version of earth in all explored universes.`

window.addEventListener("load", () => {
    // movieSearch = JSON.parse(localStorage.getItem("movieSearch"));
    
    searchContainer.appendChild(startText);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    searchContainer.appendChild(searchResult);
    searchContainer.appendChild(searchDiv);

    document.body.appendChild(searchContainer);
});

searchBtn.addEventListener("click", () => {
        
        axios.get<IOmdbResponse>("http://www.omdbapi.com/?apikey=62a4b431&s=" + searchInput.value).then((response) => {

            let amount = parseInt(response.data.totalResults);
            handleData(response.data.Search, amount);
            searchInput.value = "";  
        });
    });


function handleData(movieSearch: IMovie[], amount:number) {

    for (let i = 0; i < movieSearch.length; i++) {
        const movieSearchContainer:HTMLDivElement = document.createElement("div");
        const img:HTMLImageElement = document.createElement("img");
        const title:HTMLHeadingElement = document.createElement("h3");
        const year:HTMLParagraphElement = document.createElement("p");
        const type:HTMLParagraphElement = document.createElement("p");
        
        movieSearchContainer.classList.add("moviesearch");
        title.classList.add("moviesearch__title");
        year.classList.add("moviesearch__year");
        img.classList.add(("moviesearch__img"));
        type.classList.add("moviesearch__type");
        startText.classList.remove("start_text");

        movieSearchContainer.addEventListener("click", () => {
            movieContainer.innerHTML = "";
            handeClick(movieSearch[i]); 
        });
        
        title.innerHTML = movieSearch[i].Title;
        year.innerHTML = movieSearch[i].Year;
        type.innerHTML = movieSearch[i].Type;
        img.src = movieSearch[i].Poster;
        img.alt = movieSearch[i].Title;
        searchResult.innerHTML = "Your search returned " + amount + " results";
        startText.innerHTML = ""
        
        movieSearchContainer.appendChild(img);
        movieSearchContainer.appendChild(title);
        movieSearchContainer.appendChild(year);
        movieSearchContainer.appendChild(type);
        
        
        searchDiv.appendChild(movieSearchContainer); 
    }
}

const handeClick = (movie: IMovie) => {
    axios.get<IMovieExtended>("http://www.omdbapi.com/?apikey=62a4b431&i=" + movie.imdbID).then((response) => {
    
    const moviePoster:HTMLImageElement = document.createElement("img");
    const movieTitle:HTMLHeadingElement = document.createElement("h3");
    const movieYear:HTMLParagraphElement = document.createElement("p");
    const movieRuntime:HTMLParagraphElement = document.createElement("p");
    const movieDirector:HTMLParagraphElement = document.createElement("p");
    const movieActors:HTMLParagraphElement = document.createElement("p");
    const moviePlot:HTMLParagraphElement = document.createElement("p");

    moviePoster.classList.add("movie__poster");
    movieTitle.classList.add("movie__title");
    movieYear.classList.add("movie__year");
    movieRuntime.classList.add("movie__runtime");
    movieDirector.classList.add("movie__director");
    movieActors.classList.add("movie__actors");
    moviePlot.classList.add("movie__plot");

    moviePoster.src = response.data.Poster;
    moviePoster.alt = response.data.Title;
    movieTitle.innerHTML = response.data.Title;
    movieYear.innerHTML = response.data.Year;
    movieRuntime.innerHTML = response.data.Runtime;
    movieDirector.innerHTML = "Director: " + response.data.Director;
    movieActors.innerHTML = "Actors: " + response.data.Actors;
    moviePlot.innerHTML = response.data.Plot;
    
    searchDiv.innerHTML = "";

    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieTitle);
    movieContainer.appendChild(movieYear);
    movieContainer.appendChild(movieRuntime);
    movieContainer.appendChild(movieDirector);
    movieContainer.appendChild(movieActors);
    movieContainer.appendChild(moviePlot);
    
    searchContainer.appendChild(movieContainer);
    
    });
}


