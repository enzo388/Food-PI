const { Router } = require('express');
// Importar todos los routers;

const postReceta = require("./postReceta")
const getRecetas = require("./getRecetas")
const getRecetasByID = require("./getRecetasByID")
const getTiposDeDieta= require("./getTiposDeDietas")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/', postReceta);
router.use('/', getRecetas);
router.use('/', getRecetasByID);
router.use('/', getTiposDeDieta);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
