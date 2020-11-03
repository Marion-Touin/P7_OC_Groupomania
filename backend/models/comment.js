//Connexion à la base de données
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connexiondb')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comment', {
        'comment_id':{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey : true,
            autoIncrement : true
        },
        'user_id':{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        'post_id':{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        'date':{
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        'text': {
            type: DataTypes.STRING,
            allowNull: false,
            required: true 
        }
    }, {
        tableName : 'comments',
        freezeTableName: true
    });
};