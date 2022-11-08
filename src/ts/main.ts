import { Movie } from "./models/movie";
import { OmdbResponse } from "./models/omdbResponse";

const startText:HTMLParagraphElement = document.createElement("p");
const searchContainer:HTMLDivElement = document.createElement("div");
const searchInput:HTMLInputElement = document.createElement("input")
const searchBtn:HTMLButtonElement = document.createElement("button");
const searchResult:HTMLParagraphElement = document.createElement("p");
let movieSearch:Movie[] = [];

searchInput.type = "text";
searchBtn.type = "submit";

startText.classList.add("start_text")
searchContainer.classList.add("search");
searchInput.classList.add("search__input");
searchBtn.classList.add("search__btn");
searchResult.classList.add("search__result");

startText.innerHTML = `Welcome to this database of movies, that we encountered on our mission to Earth 6782. 
On our journey through the multiverse we found a version of earth where they no longer watch movies on VHS, but use something called "streaming". 
We managed to get access to all the different movies they've produced on this earth and turned them into VHS's for you to buy or rent. 
We ship to every planet and version of earth in all explored universes.`
searchBtn.innerHTML = "Search";

window.addEventListener("load", () => {
    // movieSearch = JSON.parse(localStorage.getItem("movieSearch"));
    
    searchContainer.appendChild(startText);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    searchContainer.appendChild(searchResult);

    document.body.appendChild(searchContainer);
    
    
    
});

searchBtn.addEventListener("click", () => {
    fetch("http://www.omdbapi.com/?apikey=62a4b431&s=" + searchInput.value.split(" ").join("%20") + "").then((response) => response.json()).then((data) => {
    
        let result:OmdbResponse = new OmdbResponse(data.totalResults, data.Search);
        
        movieSearch = (result.movies); 
        
        // localStorage.setItem("movieSearch", JSON.stringify(result.movies));
        
        searchInput.value = "";
        
        handleData(result.movies, result.amount);
        console.log(movieSearch);
        
        
    });
});

function handleData(movies:Movie[], amount:number) {

    for (let i = 0; i < movieSearch.length; i++) {

        const movieContainer = document.createElement("section");
        const img:HTMLImageElement = document.createElement("img");
        const title:HTMLHeadingElement = document.createElement("h3");
        const year:HTMLParagraphElement = document.createElement("p");
        const type:HTMLParagraphElement = document.createElement("p");
        
        movieContainer.classList.add("movie");
        title.classList.add("movie__title");
        year.classList.add("movie__year");
        img.classList.add(("movie__img"));
        type.classList.add("movie__type");
        startText.classList.remove("start_text");

        title.innerHTML = movieSearch[i].title;
        year.innerHTML = movieSearch[i].year;
        type.innerHTML = movieSearch[i].type;
        img.src = movieSearch[i].imageUrl;
        img.alt = movieSearch[i].title;
        searchResult.innerHTML = "Your search returned " + amount + " results";
        startText.innerHTML = ""

        movieContainer.appendChild(img);
        movieContainer.appendChild(title);
        movieContainer.appendChild(year);
        movieContainer.appendChild(type);
        
        
        document.body.appendChild(movieContainer);
    }
}

