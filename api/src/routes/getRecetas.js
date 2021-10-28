const axios = require('axios').default;
const { Router } = require('express');

const { traer_ambas } = require('../controllers/traer_ambas_datas');


const router = Router();
//trae la receta con el nombre quele pasas por query
router.get("/recipes", async (req, res, next) => {
  
  
  try {
   const recetas= await traer_ambas()
  
   const {name} = req.query;
   if(name){
      const receta_encontrada = recetas.filter(d => {
        return d.nombre.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      });

      if(!receta_encontrada.length){
        return res.status(404).send({ msg: "receta no existe" });
      };
      return res.status(200).send(receta_encontrada); 
    }else{
      return res.status(200).send(recetas);
    }
 
    
  } catch (error) {
     console.log(error)
  }
   
     

}) 



module.exports = router;