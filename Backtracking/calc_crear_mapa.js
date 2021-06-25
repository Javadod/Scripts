const {mapa} = require('./ruta_y_camino')
/**
    * DEPENDIENTE de la función recorrido.
    * Función que contiene 2 condiciones:
    * 1. Si origen y destino son IGUALES significa que llegó al final de la ruta.
    * 2. Si origen está ya dentro de la ruta, significa que se está en modo ciclo, por lo que debe cancelarse.
    * @param {string} origen Estación en la cual parte.
    * @param {string} destino Estación en la cual debe terminar.
    * @param {string} ruta ruta que se está evaluando.
    * @return {Number} Si retorna 1, significa que se llegó al final de la ruta.
    * @return {Number} Si retorna -1, significa que está en modo ciclo, por lo que debe retroceder.
    * @return {Number} Si retorna 0, implica a un error.
*/
function condiciones (origen, destino, ruta) {
    if (origen === destino) return 1
    if (ruta.find(e => e == origen)) return -1
    return 0
}
/**
    * DEPENDIENTE de la función recorrido.
    * Función recursiva que evalúa todas las estaciones con respecto a una estación, parametro origen.
    * @param {string} origen Estación en la cual parte.
    * @param {string} destino Estación en la cual debe terminar.
    * @param {string} mapa Todas los caminos unidos entre las estaciones.
    * @param {string} ruta ruta que se está evaluando.
    * @param {string} todo_ruta Todas las rutas correctas almacenadas.
    * @return {String[]} Retorna la lista actual de todos los recorridos encontrados que se esté buscando, en el caso origen a destino.
*/
function estaciones_siguientes (origen, destino, mapa, ruta, todo_ruta) {
    mapa.find(estacion => {
        if (estacion[0] == origen) {
            for (e of estacion[1]) {
                let rec = recorrido(e, destino, mapa, ruta, todo_ruta)
                if (rec === 1) {
                    // console.log('--------Ruta Agregada--------')
                    // console.log(ruta)
                    todo_ruta.push(ruta.toString())
                    // console.log('-----------------------------')
                    ruta.pop()
                }
                // console.log(ruta)
            }
            ruta.pop()
        }
    })
    return todo_ruta
}
/**
    * Función tipo Backtracking/Fuerza Bruta que busca todas las rutas de origen a destino.
    * @param {string} origen Estación en la cual parte.
    * @param {string} destino Estación en la cual debe terminar.
    * @param {string} mapa Todas los caminos unidos entre las estaciones.
    * @param {string} ruta ruta que se está evaluando.
    * @param {string} todo_ruta Todas las rutas correctas almacenadas.
    * @return {String[]} Retorna la lista actual de todos los recorridos encontrados que se esté buscando, en el caso origen a destino.
*/
function recorrido (origen, destino, mapa, ruta, todo_ruta) {
    let cond = condiciones(origen, destino, ruta)
    if (cond === 1) {
        ruta.push(origen)
        return 1
    } else if (cond === -1) {
        return -1
    }
    ruta.push(origen)
    return estaciones_siguientes(origen, destino, mapa, ruta, todo_ruta)
}
/**
    * Función que calcula todas las rutas de origen a destino.
    * @param {string} origen Estación en la cual parte.
    * @param {string} destino Estación en la cual debe terminar.
    * @return {String[]} Retorna la lista actual de todos los recorridos encontrados que se esté buscando, en el caso origen a destino.
*/
function hacer_recorrido (origen, destino) {
    return recorrido(origen, destino, mapa, [], [])
}
/**
    * Función todos los recorridos de todas las estaciones.
    * @return {String[][]} Retorna todas las rutas de todas las estaciones para todas las opciones.
*/
function todo_recorrido () {
    let lista = []
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa.length - 1; j++) {
            if (mapa[i][0] != mapa[j][0])
                lista.push(recorrido(mapa[i][0], mapa[j][0], mapa, [], []))
        }
    }
    return lista
}
/**
    * Función todos los recorridos de todas las estaciones separados por lista.
    * @return {String[][][]} Retorna todas las rutas de todas las estaciones para todas las opciones.
*/
function todo_recorrido_separados () {
    let lista = []
    let lista_aux
    for (let i = 0; i < mapa.length; i++) {
        lista_aux = []
        for (let j = 0; j < mapa.length - 1; j++) {
            if (mapa[i][0] != mapa[j][0])
                lista_aux.push(recorrido(mapa[i][0], mapa[j][0], mapa, [], []))
        }
        lista.push(lista_aux)
    }
    return lista
}
/**
    * Función que muestra todas las estaciones que existen.
    * @return {String[]} Retorna un arreglo con todas las estaciones.
*/
function mostrar_estaciones () {
    let lista = []
    for (const estacion of mapa) {
        lista.push(estacion[0])
    }
    return lista
}

// console.log(hacer_recorrido(1, 11))
// console.log(todo_recorrido_separados())

module.exports = {
    hacer_recorrido, 
    todo_recorrido, 
    todo_recorrido_separados,
    mostrar_estaciones
}