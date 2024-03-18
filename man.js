const API_KEY = "api_key=644ebcc3bca91f227a47d53eb28df3d1";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const infoDiv = document.querySelector(".info");
const actorsDiv = document.querySelector(".actors");

document.addEventListener("DOMContentLoaded", function () {
    const selectedMovieId = localStorage.getItem("selectedMovieId");
    if (selectedMovieId) {
        getMovieDetails(selectedMovieId);
    }
});

async function getMovieDetails(movieId) {
    try {
        const movieDetailsUrl = `${BASE_URL}movie/${movieId}?${API_KEY}`;
        const response = await fetch(movieDetailsUrl);
        const data = await response.json();
        console.log(data);
        const { title, overview, poster_path, release_date, vote_average } =
            data;

        const container = document.createElement("div");
        container.innerHTML = `
          <div class="film">
            <img src="${IMG_URL}${poster_path}" alt="${title}" class="rasm">
            <div class ="malumot">
            <h2 class="h2">${title}</h2>
            <p class = "sana">${release_date}</p>
            <span class="${getColor(vote_average)}">${vote_average}</span>
            <p class = 'p'>${overview}</p>
            </div>
          </div>
    `;
        infoDiv.appendChild(container);

        // Now get movie cast
        getMovieCast(movieId);
    } catch (error) {
        console.log(error);
    }
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

async function getMovieCast(movieId) {
    try {
        const castUrl = `${BASE_URL}movie/${movieId}/credits?${API_KEY}`;
        const response = await fetch(castUrl);
        const data = await response.json();

        data.cast.slice(0, 20).forEach((element) => {
            const { name, character, profile_path } = element;
            const container = document.createElement("div");
            container.innerHTML = `
            <div class="actor">
                <img src="${IMG_URL}${profile_path}" alt="${name}" width="150">
                <h2>${name}</h2>
                <p>${character}</p>
            </div>
            `;
            actorsDiv.appendChild(container);
        });
    } catch (error) {
        console.log(error);
    }
}
