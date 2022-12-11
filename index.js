const moviesDiv = document.getElementById('movies')
const search = document.getElementById('search')
const form = document.getElementById('form')
const backText = document.getElementById('home-page-main')
const suggestedMoviesHTML = document.getElementById('suggested-movies')
const addIconLight= './images/add-icon.svg'
const addedIcon = './images/check-solid.svg'
let movieHTML=``
let moviesId=[]
const movieNotFound = 'Unable to find what you’re looking for. Please try another search.'
let isAdded= false
let addmovie
let MoviesInStorage = JSON.parse(localStorage.getItem('movies')) || []

// rendring some movies on home page by default
const suggestedMovies = ['life', 'joker', 'hope', 'lego','fine', 'dark']
let random = Math.floor(Math.random()*suggestedMovies.length)
let chosenMovie = suggestedMovies[random]
getMoviesId(chosenMovie)



// runing the getMoviesId function and passing to it the search value of the user
form.addEventListener('submit',event => {
    movieHTML=''
    event.preventDefault()
    getMoviesId(search.value)
    
})



// taking the search value and passing it to the api and store the id of all the movies in an array called moviesId
//  after that we run the getMoviesinfo to each id of the array
async function getMoviesId(search) { 
    const res = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=2d7ffb53`)
    const data = await res.json()
    if (data.Error) { 
        // handle movie not found error
        backText.innerHTML= `<h2 class="h2">${movieNotFound}</h2>`
    }else {
        moviesId= data.Search.map(movie => movie.imdbID)
        moviesId.forEach(getMovieInfo)
        suggestedMoviesHTML.innerHTML=`<h3>recommended results for "${search}" movies</h3>`

    }
    
    
}




// fetching the data of each movie using the id of the of the movie and passing it to the render function
async function getMovieInfo(id) {
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=2d7ffb53`)
    const movie = await res.json()
    render(movie)
    
}



// function used to render the data of the movies after the user click search
function render(movie) {
    // cheking if this movie exist in localStorage so we use done icon instead of add icon
    let isMovieInStorage = MoviesInStorage.some(e => e.id ===movie.imdbID)
    movieHTML += `
    
                    <div id='${movie.imdbID}' class="container">
                        <img class="movie-poster" src="${movie.Poster}"/>
                        <div>
                            <div  class="movie-detail">
                                <h3>${movie.Title}</h3>
                                <img class="star-icon" src="./images/star-icon.svg" />
                                <p>${movie.Ratings[0].Value}</p>
                            </div>
                            <div  class="movie-detail flex">
                                <p class='runtime'>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <div onclick=saveMovie(${movie.imdbID}) class="div-btn-watchList"><img src="${isMovieInStorage? addedIcon :  addIconLight}" /> <p>Watchlist</p> </div>
                            </div>
                            <p class="plot">${movie.Plot}</p>
                        </div>
                        <hr>
                        </div>
                    
                    `
                    moviesDiv.innerHTML = movieHTML
                    
            

}




function saveMovie(movie) {
    let oldMovies = JSON.parse(localStorage.getItem('movies')) || [];
    let duplicated = oldMovies.some(e => e.id ===movie.id)
    if(duplicated) {
        // handling duplicated movies in localStorage
        alert('This movie already exists in your watchList')
    }else{
        oldMovies.push({'id':movie.id, 'html': movie.outerHTML})
        localStorage.setItem('movies', JSON.stringify(oldMovies))
        // changing the add icon to done mark after adding a movie
        addmovie = movie.getElementsByClassName('div-btn-watchList')
        addmovie.item(0).innerHTML=`<img src="${addedIcon}" /> <p>Watchlist</p>`
        

    }


}


