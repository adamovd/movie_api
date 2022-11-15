//imports
import axios from "axios";
import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";
import { IOmdbResponse } from "./models/IOmdbResponse";
import { SearchResult } from "./models/SearchResult";
import { searchMovies } from "./services/movieService";

//selectors
const logo: HTMLHeadingElement = document.createElement("h1");
const startText: HTMLParagraphElement = document.createElement("p");
const searchForm: HTMLFormElement = document.createElement("form");
const searchInput: HTMLInputElement = document.createElement("input");
const searchBtn: HTMLButtonElement = document.createElement("button");
const searchResult: HTMLParagraphElement = document.createElement("p");
const searchDiv: HTMLDivElement = document.createElement("div");
const movieContainer: HTMLDivElement = document.createElement("div");
const addDiv: HTMLDivElement = document.createElement("div");
const nextPageBtn: HTMLButtonElement = document.createElement("button");
const prevPageBtn: HTMLButtonElement = document.createElement("button");
let currentPage: number = 1;

searchInput.type = "text";
searchBtn.type = "submit";
nextPageBtn.type = "button";
prevPageBtn.type = "button";

logo.classList.add("logo");
startText.classList.add("start_text");
searchForm.classList.add("search");
searchInput.classList.add("search__input");
searchBtn.classList.add("search__btn");
searchResult.classList.add("search__result");
searchDiv.classList.add("searchresult");
movieContainer.classList.add("movie");

logo.innerHTML = "GALAXYMOVIES";
searchBtn.innerHTML = "Search";
startText.innerHTML = `Welcome to this database of movies, that we encountered on our mission to Earth 6782. </br>
</br>
On our journey through the multiverse we found a version of earth where they no longer watch movies on VHS, but use something called "streaming". </br>
</br>
We managed to get access to all the different movies they've produced on this earth and turned them into VHS's for you to buy or rent. </br>
</br>
We ship to every planet and version of earth in all explored universes.`;

window.addEventListener("load", () => {
  start();
});

searchForm.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  localStorage.setItem("searchText", searchInput.value);
  let searchText = searchInput.value;
  let result = await searchMovies(searchText, currentPage);
  handleData(result);
  disablePrevPageBtn();
});

function start() {
  searchForm.appendChild(startText);
  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchBtn);
  searchForm.appendChild(searchResult);
  searchForm.appendChild(searchDiv);

  document.body.appendChild(logo);
  document.body.appendChild(searchForm);
}

// searchForm.addEventListener("input", () => {
//     const searchText = searchInput.value;
//     localStorage.setItem("searchText", searchText);
//     currentPage = 1;
//     if (searchText.length > 2) {
//         setTimeout(() => {
//         getMovies(1);
//         }, 500)
//     }
// });

//

function handleData(response: SearchResult): void {
  searchDiv.innerHTML = "";
  searchInput.value = "";
  movieContainer.innerHTML = "";
  startText.innerHTML = "";
  movieContainer.classList.remove("movie");

  for (let i = 0; i < response.Search.length; i++) {
    const movieSearchContainer: HTMLDivElement = document.createElement("div");
    const img: HTMLImageElement = document.createElement("img");
    const title: HTMLHeadingElement = document.createElement("h3");
    const year: HTMLParagraphElement = document.createElement("p");
    const type: HTMLParagraphElement = document.createElement("p");

    movieSearchContainer.classList.add("moviesearch");
    title.classList.add("moviesearch__title");
    year.classList.add("moviesearch__year");
    img.classList.add("moviesearch__img");
    type.classList.add("moviesearch__type");
    nextPageBtn.classList.add("nextpgbtn");
    prevPageBtn.classList.add("prevpgbtn");
    startText.classList.remove("start_text");

    movieSearchContainer.addEventListener("click", () => {
      movieContainer.innerHTML = "";
      handleClick(response.Search[i]);
    });

    title.innerHTML = response.Search[i].Title;
    year.innerHTML = response.Search[i].Year;
    if (response.Search[i].Poster === "N/A") {
      img.src =
        "https://upload.wikimedia.org/wikipedia/commons/9/99/White_Background_%28To_id_screen_dust_during_cleanup%29.jpg";
    } else {
      img.src = response.Search[i].Poster;
    }
    img.alt = response.Search[i].Title;
    type.innerHTML = response.Search[i].Type;
    searchResult.innerHTML =
      "Your search returned " + response.totalAmount + " results";
    prevPageBtn.innerHTML = "<";
    nextPageBtn.innerHTML = ">";

    movieSearchContainer.appendChild(img);
    movieSearchContainer.appendChild(title);
    movieSearchContainer.appendChild(year);
    movieSearchContainer.appendChild(type);

    searchDiv.appendChild(movieSearchContainer);

    document.body.append(prevPageBtn);
    document.body.append(nextPageBtn);
    disableNextPageBtn(response.totalAmount);
  }
}

const handleClick = (movie: IMovie) => {
  axios
    .get<IMovieExtended>(
      `http://www.omdbapi.com/?apikey=62a4b431&i=${movie.imdbID}`
    )
    .then((response) => {
      searchDiv.innerHTML = "";
      searchResult.innerHTML = "";
      nextPageBtn.innerHTML = "";
      prevPageBtn.innerHTML = "";

      const movieImgContainer: HTMLDivElement = document.createElement("div");
      const movieInfoContainer: HTMLDivElement = document.createElement("div");
      const movieRentContainer: HTMLDivElement = document.createElement("div");

      const moviePoster: HTMLImageElement = document.createElement("img");
      const movieTitle: HTMLHeadingElement = document.createElement("h3");
      const movieYear: HTMLParagraphElement = document.createElement("p");
      const movieRuntime: HTMLParagraphElement = document.createElement("p");
      const movieDirector: HTMLParagraphElement = document.createElement("p");
      const movieActors: HTMLParagraphElement = document.createElement("p");
      const moviePlot: HTMLParagraphElement = document.createElement("p");

      let rentPrice: HTMLHeadingElement = document.createElement("h3");
      let rentStock: HTMLParagraphElement = document.createElement("p");
      let rentBtn: HTMLButtonElement = document.createElement("button");

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

      rentBtn.addEventListener("click", (event) => {
        event.preventDefault();
        rentCheckout();
      });

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
      searchForm.appendChild(movieContainer);
    });
};

function rentCheckout() {
  addDiv.classList.add("add");
  const load: HTMLParagraphElement = document.createElement("p");
  const cantAdd: HTMLParagraphElement = document.createElement("p");
  load.classList.add("add__load");

  load.innerHTML = "Adding to cart...";

  addDiv.appendChild(load);
  document.body.appendChild(addDiv);
  setTimeout(() => {
    load.innerHTML = "...Getting your location...";
  }, 2500);
  setTimeout(() => {
    cantAdd.classList.add("add__nobuy");
    load.innerHTML = "";
    cantAdd.innerHTML = `You live on Earth 6782, you can watch Netflix! </br> 
      <b>You don't need this!</b> </br> 
      <a>netflix.com</a>`;
    addDiv.appendChild(cantAdd);
  }, 6000);
  addDiv.addEventListener("click", () => {
    document.body.removeChild(addDiv);
    addDiv.removeChild(load);
    addDiv.removeChild(cantAdd);
  });
}

function disablePrevPageBtn() {
  if (currentPage === 1) {
    prevPageBtn.innerHTML = "";
  } else {
    prevPageBtn.innerHTML = "<";
  }
}

function disableNextPageBtn(amount: number) {
  console.log(amount / 10);

  if (currentPage > amount / 10) {
    nextPageBtn.innerHTML = "";
  }
}

nextPageBtn.addEventListener("click", () => {
  scrollTo(1, 1);
  let searchText: string = localStorage.getItem("searchText") as string;
  currentPage++;
  searchMovies(searchText, currentPage).then(async (response) => {
    let result = await searchMovies(searchText, currentPage);
    handleData(result);
    disableNextPageBtn(result.totalAmount);
  });
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage === 1) {
    disablePrevPageBtn();
  } else {
    scrollTo(1, 1);
    let searchText: string = localStorage.getItem("searchText") as string;
    currentPage--;
    searchMovies(searchText, currentPage).then(async (response) => {
      let result = await searchMovies(searchText, currentPage);
      handleData(result);
      disablePrevPageBtn();
    });
  }
});
