//Connexion à la base de données
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connexiondb')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('posts', {
        'post_id':{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey : true,
            autoIncrement : true
        },
        /*'date':{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },*/
        'userId':{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        'title':{
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        'image_url': {
            type: DataTypes.STRING,
            allowNull: false,
            required: true 
        }
    }, {
        tableName : 'posts',
        freezeTableName: true
    });
};