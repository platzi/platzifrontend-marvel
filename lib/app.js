var $ = window.jQuery
var MarvelApi = window.MarvelApi

var key = 'a548aee0bde874ea460773884934a865'
var api = new MarvelApi(key)

api.findSeries('avengers')
// encontrar datos en marvel de los avengers. Ver MarvelApi
.then((serie) => {
  // .then hace que se ejecute hasta que obtengamos los datos de los avengers
  let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
  // poner la imagen de los avengers en el tablero
  $('.Layout').css('background-image', serieImage)

  let characters = serie.characters.items
  // obtener los personajes
  let promises = []

  for (let character of characters) {
    // iterar los personajes
    let promise = api.getResourceURI(character.resourceURI)
    // genera una promise por cada personaje
    promises.push(promise)
  }
  // aqui promises ya tiene un array de Promises con las peticiones para cada personaje
  return Promise.all(promises)
  // Promise.all regresa una promesa que solo se resuelve cuando todas las promesas
  // del array estan resueltas
})
.then((characters) => {
  // solo llegamos a este punto cuando marvel.com nos regresó *todos*
  // los personajes de los avengers
  return characters.filter((character) => !!character.thumbnail)
  // filter nos permite quitar los personajes que no tienen thumbnail (imagen)
})
.then((characters) => {
  // aqui tenemos solo personajes que *si* tienen imagen

  characters = shuffle(characters)

  for (let i = 0; i < 5; i++) {
    let character = characters[i]
    drawCharacter(character)

  }


  // por cada carta
  // cambiar image .Card-image
  // cambiar .Card-description
  // cambiar .Card-name
})
.catch((err) => {
  console.error(err)
})

$('.CharacterForm').on('submit', function (event) {
  event.preventDefault()

  var name = $(this).find('.CharacterForm-name').val()
  api.searchCharacter(name)
  .then(function (character) {
    drawCharacter(character)
  })
  .catch(function (reason) {
    if (reason === 'no se encontro el personaje') {
      $('.CharacterForm-message').text(reason)
    }
  })

  // llamar a la api de marvel
  // dibujar una carta con el personaje que regrese la api
  //  - si no regresa un personaje -> no hay personaje
  //  - si regresa solo un personaje -> dibujar carta
  //  - si regresa mas de un personaje -> dibujar carta con el primer personaje que regrese
})

function renderCharacter (character) {
  let attackPoints = Math.ceil(Math.random() * 500) + 500
  // genera un numero del 500 al 1000
  return `
  <div class="Card ">
    <div class="Card-container">
      <h2 class="Card-name">${character.name}</h2><img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="wolverine" class="Card-image">
      <div class="Card-description">${character.description}</div>
      <div class="Card-attack" data-attack="${attackPoints}">${attackPoints} puntos de ataque</div>
    </div>
    <div class="Card-backface"> </div>
  </div>`
}

function shuffle (arr) {
  for (var i = 0; i < arr.length; i++) {
    let tmp = arr[i]
    let index = Math.floor(Math.random() * arr.length - 1)
    arr[i] = arr[index]
    arr[index] = tmp
  }
  return arr
}
// bubbling

function drawCharacter (character) {
  let template = renderCharacter(character)
  let $card = $(template)
  $card.on('click', function (event) {
    let $this = $(this)
    let attack = $this.find('.Card-attack')
    console.log(attack.data('attack'))
  })
  $('.Battle-player').append($card)
}