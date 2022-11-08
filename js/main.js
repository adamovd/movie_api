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
        movieSearch.push(result.movies);
        // localStorage.setItem("movieSearch", JSON.stringify(result.movies));
        searchInput.value = "";
        handleData(result.movies, result.amount);
        console.log(result.movies);
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
        title.innerHTML = movies[i].Title;
        year.innerHTML = movies[i].Year;
        type.innerHTML = movies[i].Type;
        img.src = movies[i].Poster;
        img.alt = movies[i].Title;
        searchResult.innerHTML = "Your search returned " + amount + " results";
        startText.innerHTML = "";
        movieContainer.appendChild(img);
        movieContainer.appendChild(title);
        movieContainer.appendChild(year);
        movieContainer.appendChild(type);
        document.body.appendChild(movieContainer);
    }
}
console.log(movieSearch);
