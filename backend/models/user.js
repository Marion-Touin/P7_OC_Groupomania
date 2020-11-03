//Connexion à la base de données
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connexiondb')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        'user_id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
        'firstname':{
            type: DataTypes.STRING,
            allowNull: false
        },
        'lastname':{
          type: DataTypes.STRING,
          allowNull: false
        },
        'email': {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,   
            validate: {
              isEmail : true
              }
          },
          'password': {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i
          }, 
          'role':{
            type : Sequelize.STRING,
            allowNull : false
          }
    }, {
      tableName: 'users',
      freezeTableName: true
    });
  };