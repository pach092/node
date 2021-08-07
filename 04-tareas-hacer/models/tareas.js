const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        let listado = '';
        this.listadoArr.forEach((tarea, index) => {
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            listado += `${(index + 1 + '.').green} ${tarea.desc} :: ${estado}\n`
        });
        return '\n' + listado;
    }

    listarPendientesCompletadas(completadas = true) {
        let listado = '';
        let contador = 1;
        this.listadoArr.forEach(tarea => {
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            if (completadas && tarea.completadoEn) {
                listado += `${(contador + '.').green} ${tarea.desc} :: ${tarea.completadoEn.green}\n`
                contador ++;
            } else if(!completadas && !tarea.completadoEn) {
                listado += `${(contador + '.').green} ${tarea.desc} :: ${estado}\n`
                contador ++;
            }
        });
        return '\n' + listado;
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;