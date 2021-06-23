let mapa = [
    ['a', ['b', 'e']],
    ['b', ['c', 'e', 'a', 'k']],
    ['c', ['b', 'd']],
    ['d', ['c', 'f', 'j', 'k']],
    ['e', ['b', 'h', 'a']],
    ['f', ['d', 'g', 'j']],
    ['g', ['f', 'i']],
    ['h', ['e', 'i']],
    ['i', ['h', 'g', 'k']],
    ['j', ['d', 'f']],
    ['k', ['b', 'd', 'i']]
]

function condiciones (origen, destino, ruta) {
    if (origen === destino) return 1
    if (ruta.find(e => e == origen)) return -1
    return 0
}

function estaciones_siguientes (origen, destino, mapa, ruta) {
    return mapa.find(estacion => {
        if (estacion[0] == origen) {
            for (e of estacion[1]) {
                let rec = recorrido(e, destino, mapa, ruta)
                if (rec === 1) {
                    console.log('--------Agregado--------')
                    console.log(ruta)
                    guardar_en_archivo(ruta) // Guarda2
                    console.log('------------------------')
                    ruta.pop()
                }
                console.log(ruta)
            }
            ruta.pop()
        }
    })
}

function recorrido (origen, destino, mapa, ruta) {
    let cond = condiciones(origen, destino, ruta)
    if (cond === 1) {
        ruta.push(origen)
        return 1
    } else if (cond === -1) {
        return -1
    }
    ruta.push(origen)
    return estaciones_siguientes(origen, destino, mapa, ruta)
}

const fs = require('fs')

function guardar_en_archivo (ruta) {
    let r = ruta.toString()+"\n"
    fs.appendFile('rutas.txt', r, function (err) {
        if (err) throw err
      })
}

// recorrido('a', 'b', mapa, [])

for (let i = 0; i < mapa.length; i++) {
    for (let j = 0; j < mapa.length - 1; j++) {
        if (mapa[i][0] != mapa[j][0])
            recorrido(mapa[i][0], mapa[j][0], mapa, [])
    }
}