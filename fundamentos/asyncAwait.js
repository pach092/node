// let getNombre = async () => {
// 	return "Francisco"
// }

let getNombre = () => {
	return new Promise((resolve, reject) => {

		setTimeout(() => {
		resolve("Francisco")
		}, 3000)
	})
}

let saludo = async () => {

	let nombre = await getNombre()

	return `Hola ${ nombre }`
}

saludo().then(mensaje => {
	console.log(mensaje)
})
