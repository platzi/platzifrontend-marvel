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

  characters = shuffle(characters);

  for (var i = 0; i < 5; i++) {
    var character = characters[i];
    drawCharacter(character);
  }

  // por cada carta
  // cambiar image .Card-image
  // cambiar .Card-description
  // cambiar .Card-name
})['catch'](function (err) {
  console.error(err);
});

$('.CharacterForm').on('submit', function (event) {
  event.preventDefault();

  var name = $(this).find('.CharacterForm-name').val();
  api.searchCharacter(name).then(function (character) {
    drawCharacter(character);
  })['catch'](function (reason) {
    if (reason === 'no se encontro el personaje') {
      $('.CharacterForm-message').text(reason);
    }
  });
});

function renderCharacter(character) {
  var attackPoints = Math.ceil(Math.random() * 500) + 500;
  // genera un numero del 500 al 1000
  return '\n  <div class="Card ">\n    <div class="Card-container">\n      <h2 class="Card-name">' + character.name + '</h2><img src="' + character.thumbnail.path + '.' + character.thumbnail.extension + '" alt="wolverine" class="Card-image">\n      <div class="Card-description">' + character.description + '</div>\n      <div class="Card-attack" data-attack="' + attackPoints + '">' + attackPoints + ' puntos de ataque</div>\n    </div>\n    <div class="Card-backface"> </div>\n  </div>';
}

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i];
    var index = Math.floor(Math.random() * arr.length - 1);
    arr[i] = arr[index];
    arr[index] = tmp;
  }
  return arr;
}
// bubbling

function drawCharacter(character) {
  var template = renderCharacter(character);
  var $card = $(template);
  $card.on('click', function (event) {
    var $this = $(this);
    var attack = $this.find('.Card-attack');
    console.log(attack.data('attack'));
  });
  $('.Battle-player').append($card);
}
// llamar a la api de marvel
// dibujar una carta con el personaje que regrese la api
//  - si no regresa un personaje -> no hay personaje
//  - si regresa solo un personaje -> dibujar carta
//  - si regresa mas de un personaje -> dibujar carta con el primer personaje que regrese