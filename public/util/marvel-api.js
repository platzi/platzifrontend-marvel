'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = window.jQuery;

var MarvelApi = (function () {
  function MarvelApi(key) {
    _classCallCheck(this, MarvelApi);

    // constructor se llama cuando instanciamos nuestra clase con new MarvelApi()
    this.key = key;
    this.baseUrl = 'http://gateway.marvel.com/v1/public/'
    // asignar propiedades a this
    ;
  }

  _createClass(MarvelApi, [{
    key: 'findSeries',
    value: function findSeries(title) {
      var url = '' + this.baseUrl + 'series?title=' + title + '&apikey=' + this.key;
      // construimos la url que se necesita para obtener datos de los avengers

      // siempre pide datos a la API de marvel
      if (localStorage[url]) {
        var datos = localStorage[url];
        datos = JSON.parse(datos);
        console.log('Hola desde el cache');
        return Promise.resolve(datos);
      } else {
        return Promise.resolve($.get(url))
        // hace que la peticion de jQuery se vuelva una Promise
        .then(function (res) {
          var datos = res.data.results[0];
          datos = JSON.stringify(datos);
          localStorage[url] = datos;
          // regresamos una nueva promesa con el
          // primer resultado de acuerdo a lo que nos regresa marvel
          return Promise.resolve(datos);
        });
      }
    }
  }, {
    key: 'getResourceURI',
    value: function getResourceURI(resourceURI) {
      // este metodo es muy similar al de arriba.
      // ¿Podrías crear un método interno al que llamen estos dos?
      var url = '' + resourceURI + '?apikey=' + this.key;
      if (localStorage[url]) {
        var datos = localStorage[url];
        datos = JSON.parse(datos);
        console.log('Hola desde el cache');
        return Promise.resolve(datos);
      }

      return Promise.resolve($.get(url)).then(function (res) {
        var datos = res.data.results[0];
        datos = JSON.stringify(datos);
        localStorage[url] = datos;
        return Promise.resolve(datos);
      });
    }
  }, {
    key: 'searchCharacter',
    value: function searchCharacter(name) {
      // 'http://gateway.marvel.com/v1/public/'
      // /characters?name=man&apikey=a548aee0bde874ea460773884934a865
      var url = '' + this.baseUrl + '/characters?name=' + name + '&apikey=' + this.key;
      return new Promise(function (done) {
        $.get(url).done(function (data) {
          done(data);
        });
      }).then(function (res) {
        // falsy -> 0, '', null, undefined, NaN
        // !0, !'', !null, !undefined, !NaN -> true
        if (!res.data.total) {
          return Promise.reject('no se encontro el personaje');
        }
        return res.data.results[0];
      });
    }
  }]);

  return MarvelApi;
})();

window.MarvelApi = MarvelApi
// asigna MarvelApi como variable global
;