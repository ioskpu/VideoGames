const { DataTypes, Sequelize } = require('sequelize');


const Genres = (Sequelize) => {

    Sequelize.define('Genres', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}