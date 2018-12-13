let empleados = [{
	id: 1,
	nombre: "Francisco"
},{
	id: 2,
	nombre: "Melissa"
},{
	id: 3,
	nombre: "Juan"
}]

let salarios = [{
id: 1,
salario: 1000
},{
	id: 2,
	salario: 2000
}]

let getEmpleado = (id) => {
	return new Promise((resolve, reject) => {
		let empleadoDb = empleados.find(empleado => empleado.id === id)

		if (!empleadoDb) {
			reject(`No existe un empleado con el ID: ${ id }`)
		} else {
			resolve(empleadoDb)
		}
	})
}

let getSalario = (empleado) => {
	return new Promise((resolve, reject) => {
		let salario = salarios.find(salario => salario.id === empleado.id)

		if(!salario) {
			reject(`No se encontro un salario para el empleado ${ empleado.nombre }`)
		} else {
			resolve({ nombre: empleado.nombre, salario: salario.salario })
		}
	})
}

// getEmpleado(3)
// 	.then(empleado => {
// 		getSalario(empleado)
// 			.then(resp => {
// 				console.log(`El salario de ${ resp.nombre } es de ${ resp.salario }`);
// 			}, (err) => {
// 				console.log(err)
// 			})
// 	}, (err) => {
// 		console.log(err)
// 	})

getEmpleado(10).then(empleado => getSalario(empleado))
.then(resp => console.log(`El salario de ${ resp.nombre } es de ${ resp.salario }`))
.catch(err => console.log(err))