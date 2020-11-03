//Connexion à la base de données
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connexiondb')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post', {
        'post_id':{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey : true,
            autoIncrement : true
        },
        'date':{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        'user_id':{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        'titre':{
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        'imageUrl': {
            type: DataTypes.STRING,
            allowNull: false,
            required: true 
        }
    }, {
        tableName : 'post',
        freezeTableName: true
    });
};