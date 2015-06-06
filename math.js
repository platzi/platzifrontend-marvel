Math.random() // regresa una fraccion 0-1

Math.ceil(0.5) // -> 1
Math.ceil(0.2) // -> 1
Math.ceil(0.000000000000001) // -> 1
Math.ceil(2.000000000000001) // -> 3 // siempre regresa un entero

Math.floor(0.5) // -> 0
Math.floor(0.2) // -> 0
Math.floor(0.000000000000001) // -> 0
Math.floor(2.000000000000001) // -> 2 // siempre regresa un entero

Math.round(0.5) // -> 1
Math.round(0.2) // -> 0
Math.round(0.000000000000001) // -> 0
Math.round(2.000000000000001) // -> 2 // siempre regresa un entero

let rand = Math.random() * (1000 - 500) // me genere de 0 - 500
rand = Math.ceil(rand)
