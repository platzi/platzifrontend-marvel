var $ = window.jQuery
var MarvelApi = window.MarvelApi

var key = 'a548aee0bde874ea460773884934a865'
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
  let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
  $('.Layout').css('background-image', serieImage)
  var characters = serie.characters.items
  var promises = []
  for (let character of characters) {
    let promise = api.getResourceURI(character.resourceURI)
    promises.push(promise)
  }
  return Promise.all(promises)
})
.then((characters) => {
  return characters.filter((character) => !!character.thumbnail)
})
.then((characters) => {
  $('.Card').each((i, item) => {
    let character = characters[i]
    let $this = $(item)
    let $image = $this.find('.Card-image')
    let $description = $this.find('.Card-description')
    let $name = $this.find('.Card-name')

    $image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)
    $name.text(character.name)
    $description.text(character.description)
  })
  // por cada carta
  // cambiar image .Card-image
  // cambiar .Card-description
  // cambiar .Card-name
})
.catch((err) => {
  console.error(err)
})
