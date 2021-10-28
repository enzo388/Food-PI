import {
    GET_RECETAS, GET_RECETAS_POR_NOMBRE, GET_TIPOS_DE_DIETA, FILTRAR_POR_TIPO_DE_DIETA, ORDENAR_POR_NOMBRE, ORDENAR_POR_PUNTUACION,
    GET_DETALLES, RESET_DETALLES, POST_RECETA
} from '../actions/name';




const initialState = {
    recetas: [],
    todasLasRecetas: [],
    dietas: [],
    detalles: {}
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECETAS:
            return {
                ...state,
                recetas: action.payload, //aca le digo que me mande todo lo que tiene la accion de recipes
                todasLasRecetas: action.payload,

            }

        case GET_RECETAS_POR_NOMBRE:
            return {
                ...state,
                recetas: action.payload
            }

        case GET_TIPOS_DE_DIETA:
            return {
                ...state,
                dietas: action.payload
            }

        case POST_RECETA:
            return {
                ...state
            }
        case GET_DETALLES:
            
            return {
                ...state,
                detalles: action.payload
            }
        case RESET_DETALLES:
            return {
                ...state,
                detalles: {}
            }

        case FILTRAR_POR_TIPO_DE_DIETA:
             let recetas = state.todasLasRecetas
               
                let dietas_a_filtrar1 =  recetas.filter( (e) =>  e.dieta.includes(action.payload.toString().toLowerCase()));
               
                console.log(recetas, "recetas")
                console.log(dietas_a_filtrar1, "dietas a filtradas")
                console.log(action.payload.length," payload")
                return {
                    ...state,
                    recetas: action.payload === "all" ? state.todasLasRecetas : dietas_a_filtrar1,
                };  

           
          



        case ORDENAR_POR_NOMBRE:
            let ordenar_recetas_por_nombre;
            if (action.payload === "ASC") {
                ordenar_recetas_por_nombre = state.recetas.sort((a, b) => {
                    if (a.nombre > b.nombre) return 1;
                    if (a.nombre < b.nombre) return -1;
                    return 0;
                });
            } else if (action.payload === "DESC") {
                ordenar_recetas_por_nombre = state.recetas.sort((a, b) => {
                    if (a.nombre > b.nombre) return -1;
                    if (a.nombre < b.nombre) return 1;
                    return 0;
                });
            } else {
                ordenar_recetas_por_nombre = state.todasLasRecetas
            }
            return {
                ...state,
                recetas: ordenar_recetas_por_nombre
            }


        case ORDENAR_POR_PUNTUACION:
            let ordenar_por_puntuacion;
            if (action.payload === "ASC") {
                ordenar_por_puntuacion = state.recetas.sort((a, b) => {
                    if (a.puntuacion > b.puntuacion) return 1;
                    if (a.puntuacion < b.puntuacion) return -1;
                    return 0;
                });
            } else if (action.payload === "DESC") {
                ordenar_por_puntuacion = state.recetas.sort((a, b) => {
                    if (a.puntuacion > b.puntuacion) return -1;
                    if (a.puntuacion < b.puntuacion) return 1;
                    return 0;
                });
            } else {
                ordenar_por_puntuacion = state.todasLasRecetas
            }
            return {
                ...state,
                recetas: ordenar_por_puntuacion
            }


        default:
            return state;

    }


}

export default reducer;