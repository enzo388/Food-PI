const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('receta', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen:{
      type: DataTypes.STRING
    },
    puntuacion:{
      type: DataTypes.INTEGER
    },
    nivel_de_comida_saludable:{
      type: DataTypes.INTEGER 
    },
    paso_a_paso:{
      type: DataTypes.TEXT
    },
    imagen:{
      type: DataTypes.STRING
    },
    creado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
};
