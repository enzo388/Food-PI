const { Router } = require('express');

const {Receta, Dieta} = require('../db');

const router = Router();

router.post('/recipes', async (req, res, next) =>{
    try {
        let {
            // id,
            nombre,
            resumen,
            puntuacion,
            nivel_de_comida_saludable,
            paso_a_paso,
            imagen,
            // createdInDb,
            dieta
        } = req.body;
        console.log(dieta)
        let recetaCreada = await Receta.create ({
            // id,
            nombre: nombre,
            resumen: resumen,
            puntuacion: puntuacion,
            nivel_de_comida_saludable: nivel_de_comida_saludable,
            paso_a_paso: paso_a_paso,
            imagen: imagen
            // createdInDb: createdInDb
        })
        
        
        let dietDb = await Dieta.findAll({
            where: {name: dieta}
        })
        console.log(dietDb)
        recetaCreada.addDieta(dietDb)
        res.status(200).send('Receta creada con éxitos')
    } catch (error) {
        console.log(error)
        next(error);
    }
   
})
module.exports = router;