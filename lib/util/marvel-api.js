var $ = window.jQuery

class MarvelApi {
  constructor (key) {
    // constructor se llama cuando instanciamos nuestra clase con new MarvelApi()
    this.key = key
    this.baseUrl = 'http://gateway.marvel.com/v1/public/'
    // asignar propiedades a this
  }

  findSeries (title) {
    let url = `${this.baseUrl}series?title=${title}&apikey=${this.key}`
    // construimos la url que se necesita para obtener datos de los avengers
    return Promise.resolve($.get(url))
    // hace que la peticion de jQuery se vuelva una Promise
    .then((res) => {
      return res.data.results[0]
      // regresamos una nueva promesa con el
      // primer resultado de acuerdo a lo que nos regresa marvel
    })
  }

  getResourceURI (resourceURI) {
    // este metodo es muy similar al de arriba.
    // ¿Podrías crear un método interno al que llamen estos dos?
    let url = `${resourceURI}?apikey=${this.key}`
    return Promise.resolve($.get(url))
    .then((res) => {
      return res.data.results[0]
    })
  }
}

window.MarvelApi = MarvelApi
// asigna MarvelApi como variable global
