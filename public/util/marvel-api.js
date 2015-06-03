'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = window.jQuery;

var MarvelApi = (function () {
  function MarvelApi(key) {
    _classCallCheck(this, MarvelApi);

    this.key = key;
    this.baseUrl = 'http://gateway.marvel.com/v1/public/';
  }

  _createClass(MarvelApi, [{
    key: 'findSeries',
    value: function findSeries(title) {
      var url = '' + this.baseUrl + 'series?title=' + title + '&apikey=' + this.key;
      return Promise.resolve($.get(url)).then(function (res) {
        return res.data.results[0];
      });
    }
  }, {
    key: 'getResourceURI',
    value: function getResourceURI(resourceURI) {
      var url = '' + resourceURI + '?apikey=' + this.key;
      return Promise.resolve($.get(url)).then(function (res) {
        return res.data.results[0];
      });
    }
  }]);

  return MarvelApi;
})();

window.MarvelApi = MarvelApi;