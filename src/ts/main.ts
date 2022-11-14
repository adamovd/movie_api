//imports
import axios from "axios";
import { IOmdbResponse } from "./models/IOmdbResponse";
import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";


//selectors
const startText:HTMLParagraphElement = document.createElement("p");
const searchContainer:HTMLDivElement = document.createElement("div");
const searchInput:HTMLInputElement = document.createElement("input");
const searchBtn:HTMLButtonElement = document.createElement("button");
const searchResult:HTMLParagraphElement = document.createElement("p");
const searchDiv:HTMLDivElement = document.createElement("div");
const movieContainer:HTMLDivElement = document.createElement("div");
const nextPageBtn:HTMLButtonElement = document.createElement("button");
const prevPageBtn:HTMLButtonElement = document.createElement("button");
let currentPage:number = 1;

searchInput.type = "text";
searchBtn.type = "submit";
nextPageBtn.type = "button";
prevPageBtn.type = "button";

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
    searchContainer.appendChild(startText);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    searchContainer.appendChild(searchResult);
    searchContainer.appendChild(searchDiv);
    
    document.body.appendChild(searchContainer);
});

searchBtn.addEventListener("click", () => {
    const url = searchInput.value;
    localStorage.setItem("url", url);
    currentPage = 1;
    getMovies(currentPage);
    });

function getMovies(page:number){
    axios
    .get<IOmdbResponse>("http://www.omdbapi.com/?apikey=62a4b431&s=" + localStorage.getItem("url") + "&page=" + page
    )
    .then((response) => {
    let amount = parseInt(response.data.totalResults);
    const movieSearch:IMovie [] = response.data.Search;
    handleData(movieSearch, amount);
        
    });
}

function handleData(movieSearch: IMovie[], amount:number):void {
    searchDiv.innerHTML = "";
    searchInput.value = ""; 
    movieContainer.innerHTML = "";
    startText.innerHTML = ""
    movieContainer.classList.remove("movie");
    
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
        nextPageBtn.classList.add("nextpgbtn");
        prevPageBtn.classList.add("prevpgbtn");
        startText.classList.remove("start_text");

        movieSearchContainer.addEventListener("click", () => {
            movieContainer.innerHTML = "";
            handeClick(movieSearch[i]); 
        });
        
        title.innerHTML = movieSearch[i].Title;
        year.innerHTML = movieSearch[i].Year;
        if (movieSearch[i].Poster === "N/A") {
            img.src = "https://upload.wikimedia.org/wikipedia/commons/9/99/White_Background_%28To_id_screen_dust_during_cleanup%29.jpg";
        }else {
            img.src = movieSearch[i].Poster;
        }
        img.alt = movieSearch[i].Title;
        type.innerHTML = movieSearch[i].Type;
        searchResult.innerHTML = "Your search returned " + amount + " results";
        prevPageBtn.innerHTML = "<";
        nextPageBtn.innerHTML = ">";

        movieSearchContainer.appendChild(img);
        movieSearchContainer.appendChild(title);
        movieSearchContainer.appendChild(year);
        movieSearchContainer.appendChild(type);
        
        
        searchDiv.appendChild(movieSearchContainer); 

        document.body.append(prevPageBtn);
        document.body.append(nextPageBtn);
    }
}



const handeClick = (movie: IMovie) => {
    axios.get<IMovieExtended>("http://www.omdbapi.com/?apikey=62a4b431&i=" + movie.imdbID).then((response) => {
    
    searchDiv.innerHTML = "";
    searchResult.innerHTML = "";
    nextPageBtn.innerHTML = "";

    const movieImgContainer:HTMLDivElement = document.createElement("div");
    const movieInfoContainer:HTMLDivElement = document.createElement("div");
    const movieRentContainer:HTMLDivElement = document.createElement("div");

    const moviePoster:HTMLImageElement = document.createElement("img");
    const movieTitle:HTMLHeadingElement = document.createElement("h3");
    const movieYear:HTMLParagraphElement = document.createElement("p");
    const movieRuntime:HTMLParagraphElement = document.createElement("p");
    const movieDirector:HTMLParagraphElement = document.createElement("p");
    const movieActors:HTMLParagraphElement = document.createElement("p");
    const moviePlot:HTMLParagraphElement = document.createElement("p");

    let rentPrice:HTMLHeadingElement = document.createElement("h3");
    let rentStock:HTMLParagraphElement = document.createElement("p");
    let rentBtn:HTMLButtonElement = document.createElement("button");

    movieContainer.classList.add("moviecontainer");
    movieImgContainer.classList.add("img");
    movieInfoContainer.classList.add("movie");
    movieRentContainer.classList.add("rent");

    moviePoster.classList.add("img__poster");

    movieTitle.classList.add("movie__title");
    movieYear.classList.add("movie__year");
    movieRuntime.classList.add("movie__runtime");
    movieDirector.classList.add("movie__director");
    movieActors.classList.add("movie__actors");
    moviePlot.classList.add("movie__plot");

    rentPrice.classList.add("rent__price");
    rentStock.classList.add("rent__stock");
    rentBtn.classList.add("rent__btn");

    moviePoster.src = response.data.Poster;
    moviePoster.alt = response.data.Title;

    movieTitle.innerHTML = response.data.Title;
    movieYear.innerHTML = response.data.Year;
    movieRuntime.innerHTML = response.data.Runtime;
    movieDirector.innerHTML = "Director: " + response.data.Director;
    movieActors.innerHTML = "Actors: " + response.data.Actors;
    moviePlot.innerHTML = response.data.Plot;
    
    rentPrice.innerHTML = "$9";
    rentStock.innerHTML = "In Stock";
    rentBtn.innerHTML = "Add to cart";

    movieImgContainer.appendChild(moviePoster);

    movieInfoContainer.appendChild(movieTitle);
    movieInfoContainer.appendChild(movieYear);
    movieInfoContainer.appendChild(movieRuntime);
    movieInfoContainer.appendChild(movieDirector);
    movieInfoContainer.appendChild(movieActors);
    movieInfoContainer.appendChild(moviePlot);

    movieRentContainer.appendChild(rentPrice);
    movieRentContainer.appendChild(rentStock);
    movieRentContainer.appendChild(rentBtn);

    movieContainer.appendChild(movieImgContainer);
    movieContainer.appendChild(movieInfoContainer);
    movieContainer.appendChild(movieRentContainer);
    searchContainer.appendChild(movieContainer);
});
}

function disablePrevPageBtn() {
    if (currentPage === 1) {
        prevPageBtn.innerHTML = "";
    } else {
        prevPageBtn.innerHTML = "<";
    }
}

nextPageBtn.addEventListener("click", () => {
    currentPage++;
    disablePrevPageBtn()
    getMovies(currentPage);
});

prevPageBtn.addEventListener("click", () => {
    if (currentPage === 1) {
        disablePrevPageBtn();
    } else {
        currentPage--;
        disablePrevPageBtn();
        getMovies(currentPage);
    }
});



