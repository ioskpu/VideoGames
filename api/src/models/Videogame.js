const { DataTypes } = require('sequelize');


 const Videogame = (sequelize) => {

  sequelize.define('videogame', {

    id : {
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey : true,
      allowNull: false,
    },

    name : {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },

    description : {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms : {
      type : DataTypes.STRING,
      allowNull: false,
    },

    background_image : {
      type : DataTypes.STRING,
      allowNull: false,
    },

    short_screenshots : {
      type : DataTypes.STRING,   
    },

    released : {
      type : DataTypes.DATEONLY,
      allowNull: false,
    },

    rating : {
      type : DataTypes.FLOAT,
      allowNull: false,
    },

    db : {
      type : DataTypes.BOOLEAN,
      defaultValue: true
    }

  },{timestamps : false});
};


module.exports = Videogame;