const {hacer_recorrido, todo_recorrido_separados, mostrar_estaciones} = require('./calc_crear_mapa')


let todas_las_rutas = todo_recorrido_separados()
let contador = 1
let contador_interno_rutas = 1

let insert_sql = `insert into ruta(id, nombre, descripcion, id_estacion_origen, id_estacion_destino) values`
let ruta_modificada
let lista_values_sql = []
let size

for (let i = 0; i < todas_las_rutas.length; i++) {
    for (let j = 0; j < todas_las_rutas[i].length; j++) {
        contador_interno_rutas = 1
        for (const ruta of todas_las_rutas[i][j]) {
            ruta_modificada = ruta.replace(/,/g, ' - ')
            size = ruta_modificada.length
            lista_values_sql.push(
                `(${contador}, 'ruta ${contador_interno_rutas} ${ruta_modificada.substring(0, 1)}-${ruta_modificada.substring(size-1, size)}', '${ruta_modificada}', ${ruta_modificada.substring(0, 1)}, ${ruta_modificada.substring(size-1, size)});`
            )
            contador_interno_rutas += 1
            contador += 1
        }
    }
}

// console.log(lista_values_sql)


// Guarda todas las rutas en la tabla ruta
for (let i = 0; i < lista_values_sql.length; i++) {
    const values = lista_values_sql[i]
    let insert = `${insert_sql} ${values}`
    console.log(insert)
}

// Guarda las estaciones en la tabla estacion
let estaciones = mostrar_estaciones()
let insert_sql_tabla_estacion = `insert into estacion(id) values`
for (const e of estaciones) {
    let insert = `${insert_sql_tabla_estacion} (${e});`
    console.log(insert)
}