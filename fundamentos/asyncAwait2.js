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

let getEmpleado = async (id) => {
	let empleadoDb = empleados.find(empleado => empleado.id === id)

	if (!empleadoDb) {
		throw new Error(`No existe un empleado con el ID: ${ id }`)
	} else {
		return empleadoDb
	}
}

let getSalario = async (empleado) => {
	let salario = salarios.find(salario => salario.id === empleado.id)

	if(!salario) {
		throw new Error(`No se encontro un salario para el empleado ${ empleado.nombre }`)
	} else {
		return { nombre: empleado.nombre, salario: salario.salario }
	}
}

let getInformacion = async (id) => {
	let empleado = await getEmpleado(id)
	let resp = await getSalario(empleado)

	return `${resp.nombre} tiene un salario de ${resp.salario}`
}

getInformacion(10)
	.then(mensaje => console.log(mensaje))
	.catch(err => console.log(err))