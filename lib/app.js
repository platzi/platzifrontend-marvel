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
  $('.Card').each((i, item) => {
    // por cada <div class="Card">
    let character = characters[i]
    // character el personaje i, es decir que cambia con cada Card
    let $this = $(item)
    let $image = $this.find('.Card-image')
    let $description = $this.find('.Card-description')
    let $name = $this.find('.Card-name')

    $image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)
    // Cambiar la imagen
    $name.text(character.name)
    // Cambiar el nombre
    $description.text(character.description)
    // Cambiar la descripcion
  })
  // por cada carta
  // cambiar image .Card-image
  // cambiar .Card-description
  // cambiar .Card-name
})
.catch((err) => {
  console.error(err)
})
