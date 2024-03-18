const API_KEY = "api_key=644ebcc3bca91f227a47d53eb28df3d1";
const BASE_URL = `https://api.themoviedb.org/3/`;

const popularMovies =
    BASE_URL + `discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const searchMovies = BASE_URL + `/search/movie?${API_KEY}&query=`;

// const MOVIE_ID = "157336";
const MOVIE_URL = `${BASE_URL}movie/${MOVIE_ID}?${API_KEY}`;
const CAST_URL = `${BASE_URL}movie/${MOVIE_ID}/credits?${API_KEY}`;

const form = document.querySelector("form");
const input = document.querySelector("input");
const main = document.getElementById("main");

const infoDiv = document.querySelector(".info");
const actorsDiv = document.querySelector(".actors");

window.addEventListener("DOMContentLoaded", showPopularMovies);
form.addEventListener("submit", getMovies);

async function showPopularMovies() {
    const response = await fetch(popularMovies);
    const data = await response.json();

    updateDisplay(data.results);
}
async function getMovies(e) {
    e.preventDefault();

    const response = await fetch(searchMovies + input.value);
    const data = await response.json();

    updateDisplay(data.results);
}

function rateColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

function updateDisplay(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        // console.log(movieEl);
        movieEl.setAttribute("onclick", `hello(${JSON.stringify(movie)})`);
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${rateColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
    form.reset();
}

function showMovie(movie) {
    console.log(movie);
    console.log(movie.id);
    window.location.href = "film.html";
    getMovieDetails(MOVIE_URL);
    getMovieCast(CAST_URL);
    console.log(BASE_URL);
    // return movie;
}

async function getMovieDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        const { title, overview, poster_path } = data;

        console.log(title);
        console.log(overview);
        console.log(IMG_URL + poster_path);

        const container = document.createElement("div");
        container.innerHTML = `
        <div class = "film">
            <img src="${IMG_URL}${poster_path}" alt="${title}" class = "rasm">
            <h2 class = "h2">${title}</h2>
            <p>${overview}</p>
        </div>
    `;
        infoDiv.append(container);
    } catch (error) {
        console.log(error);
    }
}

async function getMovieCast(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.cast.slice(0));

        data.cast.slice(0, 9).forEach((element) => {
            const { name, character, profile_path } = element;
            const container = document.createElement("div");
            // container.style.display = "flex";
            container.innerHTML = `
            <div class = "actor">
                <img src="${IMG_URL}${profile_path}" alt="${name}" width="150">
                <h2>${name}</h2>
                <p>${character}</p>
            </div>
            `;
            actorsDiv.append(container);
        });
    } catch (error) {
        console.log(error);
    }
}
