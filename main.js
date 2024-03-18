// API Key
// 644ebcc3bca91f227a47d53eb28df3d1

//  https://api.themoviedb.org/3/movie/157336?api_key=644ebcc3bca91f227a47d53eb28df3d1
//  https://api.themoviedb.org/3/movie/157336/videos?api_key=644ebcc3bca91f227a47d53eb28df3d1

// https://api.themoviedb.org/3/movie/157336?api_key=644ebcc3bca91f227a47d53eb28df3d1&append_to_response=videos,images

const form = document.querySelector(".header__form");
const input = document.querySelector(".header__input");

const API_Key = "api_key=644ebcc3bca91f227a47d53eb28df3d1";
const BASE_URL = `https://api.themoviedb.org/3/`;
const API_URL = BASE_URL + `discover/movie?sort_by=popularity.desc&${API_Key}`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const search_URL = BASE_URL + `/search/movie?${API_Key}&query=`;

const main = document.getElementById("main");

// Filmlarni olish
getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showMovies(data.results);
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function showMovies(data) {
    main.innerHTML = "";
    data.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        // console.log(movieEl);
        movieEl.setAttribute("onclick", `hello(${movie.id})`);
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

 function hello(movieId) {
    localStorage.setItem('selectedMovieId', movieId);
    window.location.href = "film.html";
}


function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = input.value;
    if (searchTerm) {
        getMovies(search_URL + searchTerm);
    } else {
        getMovies(API_URL);
    }
    form.reset();
});

// export { input };
