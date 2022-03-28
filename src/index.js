// // movie flim

// const Base_URL = 'https://ghibliapi.herokuapp.com'
window.addEventListener('DOMContentLoaded', () => {
    getFilms()
    document.getElementById("films").addEventListener('click', getFilms)
})

function getFilms() {
    const ul = document.getElementById('film-list')
    const info = document.getElementById('info')
    info.innerHTML = ''
    ul.innerHTML=''
//     //fetch allows pages to be loaded asynchoronous execution it allows the executiion to continue while the fetch is being worked on
//     // 2t things does just this one 9 line do? -> 왜 2번째 parameter가 필요없지 - > send http,a get request, return a promise object project has 3 status: 
//     // fetch에서 asynchroniss execution helps 한번더 확인//

    // fetch(Base_URL + '/shows')

    fetch('https://ghibliapi.herokuapp.com/films')
    .then(res => res.json())
    .then(data => {
        data.forEach(film => {
            ul.innerHTML += `
                <li><a href="#" data-id="${film.id}">${film.title}</a></li>
            ` 

        })
        clicksToLinks()               
    })
}

const clicksToLinks =() =>{
    const films = document.querySelectorAll('a')
    films.forEach((film) => {
        film.addEventListener('click', displayFilms)
        
    })
}

const displayFilms = (event) => {
    console.log(event.target.dataset.id)
    const info = document.getElementById('info')
    const ul = document.getElementById('film-list')
    ul.innerHTML= ''
    fetch(`https://ghibliapi.herokuapp.com/films/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        info.innerHTML = `<h1>${data.title}</h1>
        <h3><img src= "https://ghibliapi.herokuapp.com/films/${data.image}"/></h3>
        <h4>Summary:</h4>
        <p>${data.description}</p>
        <h4>Director:</h4>
        <p>${data.director}</p>
        <h4>Producer:</h4>
        <p>${data.producer}</p>
        <h4>Release Date:</h4>
        <p>${data.release_date}</p>`
    })
}



