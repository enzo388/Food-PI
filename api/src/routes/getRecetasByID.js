const { Router } = require('express');
const router = Router();
const { traer_ambas } = require('../controllers/traer_ambas_datas');

router.get('/recipes/:id', async (req, res) => {

    const { id } = req.params;
    const todas_las_recetas = await traer_ambas()
    console.log(id)
    try {
        if (id) {
           
            let receta_buscada = todas_las_recetas.filter(d => {
                return d.id == id
              });
            
            if (receta_buscada.length === 0) {
                return res.status(400).send('No existe ese id de receta')
                
            }else {
                return res.status(200).send(receta_buscada);
                
            }
            

        };
    }
    catch (e) {
        return res.status(400).send({ msg: "Id incorrecto" });
    }

})

module.exports = router;
