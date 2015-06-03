var $ = window.jQuery
var MarvelApi = window.MarvelApi

var key = 'a548aee0bde874ea460773884934a865'
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
  var characters = serie.characters.items
  var promises = []
  for (let character of characters) {
    let promise = api.getResourceURI(character.resourceURI)
    promises.push(promise)
  }
  return Promise.all(promises)
})
.then((characters) => {
  debugger
  console.log(characters)
})
.catch((err) => {
  console.error(err)
})
