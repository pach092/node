const { crearArchivo } = require("./multiplicar/multiplicar")

let base = "10"

crearArchivo(base)
	.then(archivo => console.log(`Archivo creado: ${archivo}`))
	.catch(err => console.log(err))