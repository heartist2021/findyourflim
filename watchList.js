const favmovies = document.getElementById('movies')
const delet= './images/remove-light.svg'
const removeAllHTML = document.getElementById('remove-all')
const noMovies = document.getElementById('home-page-main')

// checking if there is any movies in localStorage
let moviesFromLocalStorage = JSON.parse(localStorage.getItem('movies') ) || []

// displaying remove all only if there is more than one movie on local storage
if (moviesFromLocalStorage.length > 1) {
    removeAllHTML.innerHTML = '<img src="./images/remove-light.svg"/><p>Remove All</p>'
}else {
    removeAllHTML.style.display='none'
}
// using Array.reverse to display the last added movies first
moviesFromLocalStorage.reverse()
mvHtml = moviesFromLocalStorage.map((mv) => (mv.html)).join('')


if(mvHtml) {
    favmovies.innerHTML=mvHtml
}

console.log('mvhtml')
const remove = document.getElementsByClassName('div-btn-watchList')

// we get the data from localStorage as plain html so we want to change the add button to the remove button that's why we use this function
function changeIconToRemove() {
    
    for(let i=0; i<remove.length;i++) {
        console.log(remove[i].innerHTML)
        remove[i].innerHTML=`<img src="./images/remove-light.svg"/><p>Remove</p>`
}


}


function saveMovie(movie){
    let newarray = JSON.parse(localStorage.getItem('movies') ).filter(e => (e.id != movie.id))
    const newfilms= newarray.map((mv) => (mv.html)).join('')
    
    localStorage.setItem('movies', JSON.stringify(newarray))
    favmovies.innerHTML= newfilms
    if (!newfilms.length) {
        removeAllHTML.style.display='none'
        favmovies.innerHTML= noMovies.outerHTML
    }
    changeIconToRemove()


}

changeIconToRemove()


// addEventListener to remove-all button in order to clear the localStorage
removeAllHTML.addEventListener('click', function() {
    localStorage.removeItem("movies")
    favmovies.innerHTML= noMovies.outerHTML
    if (!localStorage.getItem('movies')) {
        removeAllHTML.style.display='none'
    }
})