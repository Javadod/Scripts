const {hacer_recorrido} = require('./calc_crear_mapa')
const {distancia} = require('./ruta_y_camino')

/**
    * Función que permite calcular la distancia de una ruta.
    * @param {string} ruta Será una ruta válida que este delimitada por comas.
    * ej. a,b,c,d,e,f
    * @return {Number} retorna la suma de todas las intersecciones de las estaciones que tenga la ruta.
    * @return {Number} en caso que retorne -1, significa que la ruta está dañada en términos de conexiones de estaciones.
*/
function calcular_distancia (ruta) {
    let separar_rutas = ruta.split(',')
    let distancia = 0,
        valor = 0
    for (let i = 0; i < separar_rutas.length - 1; i++) {
        valor = buscar_ruta(separar_rutas[i], separar_rutas[i+1])
        if (valor == -1) return -1
        distancia += valor
    }

    return distancia
}
/**
    * DEPENDIENTE de la función calcular_distancia
    * Función que busca las distancia entre dos estaciones.
    * @param {string} origen Será una estación válida.
    * @param {string} destino Será una estación válida.
    * @return {Number} retorna la distancia entre las dos estaciones.
    * @return {Number} en caso que retorne -1, significa que no se encontró alguna estación.
*/
function buscar_ruta (origen, destino) {
    for (estacion of distancia)
        if (estacion[0] == origen || estacion[0] == destino)
            if (estacion[1] == origen || estacion[1] == destino)
                return estacion[2]
    return -1
}
/**
    * DEPENDIENTE de la función calcular_distancia
    * Función que calcula la menor distancia de origen a destino de las estaciones.
    * @param {string} origen Será una estación válida.
    * @param {string} destino Será una estación válida.
    * @return {String[]} retorna en un arreglo la distancia mínima con la ruta.
*/
function calcular_menor_distancia (origen, destino) {
    let minimo = -1,
        aux,
        ruta_minima,
        lista = hacer_recorrido(origen, destino)
    for (ruta of lista) {
        aux = calcular_distancia(ruta)
        console.log(aux)
        if (aux < minimo || minimo === -1) {
            minimo = aux
            ruta_minima = ruta
        }
    }
    return [minimo.toString(), ruta_minima]
}

console.log(calcular_menor_distancia(1, 11))

// module.exports = {
//     calcular_menor_distancia
// }