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

let getEmpleado = (id, callback) => {
	let empleadoDb = empleados.find(empleado => empleado.id === id)

	if (!empleadoDb) {
		callback(`No existe un empleado con el ID: ${ id }`)
	} else {
		callback(null, empleadoDb)
	}
}

let getSalario = (empleado, callback) => {
	let salario = salarios.find(salario => salario.id === empleado.id)

	if(!salario) {
		callback(`No se encontro un salario para el empleado ${ empleado.nombre }`)
	} else {
		callback(null, { nombre: empleado.nombre, salario: salario.salario})
	}
}

getEmpleado(1, (err, empleado) => {

	if (err) {
		return console.log(err)
	}

	getSalario(empleado, (err, resp) => {
		if (err) {
			return console.log(err)
		}

		console.log(`El salario de ${ resp.nombre } es de ${ resp.salario }`);
	})
})