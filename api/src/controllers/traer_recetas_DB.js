const { Receta, Dieta } = require('../db');

async function traer_recetas_BD() {
       try {
           let recetas = await Receta.findAll({
               attributes: ['id', 'nombre', 'resumen', 'puntuacion', 'nivel_de_comida_saludable', 'paso_a_paso', 'imagen', 'creado', ],
               include: {
                   model: Dieta,
                   attributes: ['name'],
                   through: {
                       attributes: []
                   }
               } 
           });
           console.log(recetas)
           return recetas
           
       } catch (error) {
           console.log(error)
       }
   
       



    /* try {
        const dbRecipes = await Recipe.findAll({
            where: {
                [Op.or]: [{
                    Nombre:
                    {
                        [Op.like]: '%' + Nombre + '%'
                    }
                }, {
                    Nombre:
                    {
                        [Op.like]: Nombre + '%'
                    }
                }]

            },
            include: Types
        })
        res.status(200).json(dbRecipes);
    } catch (e) {
        console.log(e);
    }
 */




}
module.exports = {
    traer_recetas_BD
}