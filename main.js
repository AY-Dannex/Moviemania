const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a5fb16104897367a1cc9d427a18e44e9";
const IMG_URL = "https://image.tmdb.org/t/p/w500"
async function fetchMovies(){
  try{
    const feedback = await fetch(`${API_URL}`);
    const responce = await feedback.json();
    return responce.results;
  }catch(error){
    alert (error);
  }
}

function renderMovies(results){
  const movieContainer = document.getElementById("movie-container");
  
  results.forEach((result) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const movieImage = document.createElement("img");
    movieImage.src = IMG_URL + result.poster_path
    movieImage.classList.add("movie-image")

    const movieName = document.createElement("h5")
    movieName.textContent = result.title
    movieName.classList.add("movie-name")

    const movieReleaseDate = document.createElement("p")
    movieReleaseDate.textContent = result.release_date
    movieReleaseDate.classList.add("movie-release-date")

    const movieOverviewContainer = document.createElement("div")
    movieOverviewContainer.classList.add("movie-overview-container")

    const movieOverview = document.createElement("p")
    movieOverview.textContent = `${result.original_title} was relaesed on ${result.release_date}. INFO: ${result.overview} `
    movieOverview.classList.add("movie-overview")

    const addToWatchlist = document.createElement("button")
    addToWatchlist.innerHTML = "Add to Watchlist"
    addToWatchlist.classList.add("watchlist-btn")

    const removeFromWatchlist = document.createElement("button")
    removeFromWatchlist.classList.add("remove-from-watchlist-btn")
    removeFromWatchlist.innerHTML = "Remove From Watchlist"
    removeFromWatchlist.style.display = "none"

    const myWatchlist = document.getElementById("watchlist-container")
    const watchlistHeading = document.getElementById("watchlist-heading")
    watchlistHeading.style.display = "none"
    
    addToWatchlist.addEventListener("click", () => {
      // const clonedMovieCard = movieCard.cloneNode(true)
      // myWatchlist.appendChild(clonedMovieCard)
      // myWatchlist.innerHTML += movieCard.outerHTML
      myWatchlist.appendChild(movieCard)
      addToWatchlist.style.display = "none"
      removeFromWatchlist.style.display = "block"
      watchlistHeading.style.display = "block"
    })
    
    removeFromWatchlist.addEventListener("click", () => {
      movieContainer.appendChild(movieCard)
      removeFromWatchlist.style.display = "none"
      addToWatchlist.style.display = "block"
    })

    movieCard.appendChild(movieImage)
    movieCard.appendChild(movieName)
    movieCard.appendChild(movieOverviewContainer)
    movieOverviewContainer.appendChild(movieOverview)
    movieOverviewContainer.appendChild(addToWatchlist)
    movieOverviewContainer.appendChild(removeFromWatchlist)
    movieContainer.appendChild(movieCard)
    
  })

  

}

document.addEventListener("DOMContentLoaded", async () => {
  const listOfMovies = await fetchMovies()
  renderMovies(listOfMovies)
})

