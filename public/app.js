'use strict';

var $ = window.jQuery;
var MarvelApi = window.MarvelApi;

var key = 'a548aee0bde874ea460773884934a865';
var api = new MarvelApi(key);

api.findSeries('avengers')
// encontrar datos en marvel de los avengers. Ver MarvelApi
.then(function (serie) {
  // .then hace que se ejecute hasta que obtengamos los datos de los avengers
  var serieImage = 'url(' + serie.thumbnail.path + '.' + serie.thumbnail.extension + ')';
  // poner la imagen de los avengers en el tablero
  $('.Layout').css('background-image', serieImage);

  var characters = serie.characters.items;
  // obtener los personajes
  var promises = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var character = _step.value;

      // iterar los personajes
      var promise = api.getResourceURI(character.resourceURI);
      // genera una promise por cada personaje
      promises.push(promise);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  // aqui promises ya tiene un array de Promises con las peticiones para cada personaje
  return Promise.all(promises)
  // Promise.all regresa una promesa que solo se resuelve cuando todas las promesas
  // del array estan resueltas
  ;
}).then(function (characters) {
  // solo llegamos a este punto cuando marvel.com nos regresó *todos*
  // los personajes de los avengers
  return characters.filter(function (character) {
    return !!character.thumbnail;
  })
  // filter nos permite quitar los personajes que no tienen thumbnail (imagen)
  ;
}).then(function (characters) {
  // aqui tenemos solo personajes que *si* tienen imagen
  $('.Card').each(function (i, item) {
    // por cada <div class="Card">
    var character = characters[i];
    // character el personaje i, es decir que cambia con cada Card
    var $this = $(item);
    var $image = $this.find('.Card-image');
    var $description = $this.find('.Card-description');
    var $name = $this.find('.Card-name');

    $image.attr('src', '' + character.thumbnail.path + '.' + character.thumbnail.extension);
    // Cambiar la imagen
    $name.text(character.name);
    // Cambiar el nombre
    $description.text(character.description);
  });
})['catch'](function (err) {
  console.error(err);
});
// Cambiar la descripcion
// por cada carta
// cambiar image .Card-image
// cambiar .Card-description
// cambiar .Card-name