const{ Dieta } = require("../db")
const { Router } = require('express');



const router = Router();
//trae la receta con el nombre quele pasas por query
router.get("/types", async (req, res, next) => {
    try {
        let dietas = await Dieta.findAll({
            attributes: ['name'],
        })
        if(dietas){
           return res.status(200).send(dietas)
        }else{
            return res.status(404).send("no se encontraron las dietas")
        }

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;