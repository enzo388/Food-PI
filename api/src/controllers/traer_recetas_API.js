require('dotenv').config();
const axios = require("axios");
const {Receta, TipoDeDieta } = require("../db")
const {
API_KEY
  } = process.env;

//https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}
//CLAVE_API="931f502300a34d29b4952b691751e14b"


async function traer_recetas_api() {

    try {
        let recetas = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`));

        recetas = recetas.data.results
        

        
    const instructionsmaps1 = recetas.map(e =>{
        return{
            instructions: e.analyzedInstructions[0]
        }
    })

    const instructionsmaps2 = instructionsmaps1[0].instructions.steps.map(e => {
        return {
            passos: e.step
        }
    })

   
    var x = instructionsmaps2.map(e=>{
        return{
            x: Object.values(e)
        }
    })
    var xx= []
   x.map(e => {
        xx.push(e.x)
    })
/* 
    console.log(xx.flat(), "holaaaa") */
    
        /* console.log(recetas) */
        let recetas1 = recetas.map(e => {

            return {
                id: e.id,
                nombre: e.title,
                resumen: e.summary ? e.summary.replace(/<[^>]*>?/gm, '') : '',
                puntuacion: e.spoonacularScore,
                nivel_de_comida_saludable: e.healthScore,
                dieta: e.diets,
                paso_a_paso: xx.flat().toString(),
                imagen: e.image
            }
        })
        return recetas1;
    } catch (error) {
        console.log(error, "errorr")
    }

}


module.exports = {
    traer_recetas_api
}