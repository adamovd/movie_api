"use strict";
exports.__esModule = true;
var omdbResponse_1 = require("./models/omdbResponse");
var startText = document.createElement("p");
var searchContainer = document.createElement("div");
var searchInput = document.createElement("input");
var searchBtn = document.createElement("button");
var searchResult = document.createElement("p");
var movieSearch = [];
searchInput.type = "text";
searchBtn.type = "submit";
startText.classList.add("start_text");
searchContainer.classList.add("search");
searchInput.classList.add("search__input");
searchBtn.classList.add("search__btn");
searchResult.classList.add("search__result");
startText.innerHTML = "Welcome to this database of movies, that we encountered on our mission to Earth 6782. \nOn our journey through the multiverse we found a version of earth where they no longer watch movies on VHS, but use something called \"streaming\". \nWe managed to get access to all the different movies they've produced on this earth and turned them into VHS's for you to buy or rent. \nWe ship to every planet and version of earth in all explored universes.";
searchBtn.innerHTML = "Search";
window.addEventListener("load", function () {
    // movieSearch = JSON.parse(localStorage.getItem("movieSearch"));
    searchContainer.appendChild(startText);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    searchContainer.appendChild(searchResult);
    document.body.appendChild(searchContainer);
});
searchBtn.addEventListener("click", function () {
    fetch("http://www.omdbapi.com/?apikey=62a4b431&s=" + searchInput.value.split(" ").join("%20") + "").then(function (response) { return response.json(); }).then(function (data) {
        var result = new omdbResponse_1.OmdbResponse(data.totalResults, data.Search);
        movieSearch = (result.movies);
        // localStorage.setItem("movieSearch", JSON.stringify(result.movies));
        searchInput.value = "";
        handleData(result.movies, result.amount);
        console.log(movieSearch);
    });
});
function handleData(movies, amount) {
    for (var i = 0; i < movies.length; i++) {
        var movieContainer = document.createElement("section");
        var img = document.createElement("img");
        var title = document.createElement("h3");
        var year = document.createElement("p");
        var type = document.createElement("p");
        movieContainer.classList.add("movie");
        title.classList.add("movie__title");
        year.classList.add("movie__year");
        img.classList.add(("movie__img"));
        type.classList.add("movie__type");
        startText.classList.remove("start_text");
        //om jag skriver stor bokstav på Title, Year osv. nedanför så funkar det.
        title.innerHTML = movies[i].title;
        year.innerHTML = movies[i].year;
        type.innerHTML = movies[i].type;
        img.src = movies[i].imageUrl;
        img.alt = movies[i].title;
        searchResult.innerHTML = "Your search returned " + amount + " results";
        startText.innerHTML = "";
        movieContainer.appendChild(img);
        movieContainer.appendChild(title);
        movieContainer.appendChild(year);
        movieContainer.appendChild(type);
        document.body.appendChild(movieContainer);
    }
}
