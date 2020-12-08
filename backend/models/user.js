module.exports = (sequelize, Sequelize) => {
  const Users =  sequelize.define('user', {
    'user_id': {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'firstname': {
      type: Sequelize.STRING,
      
    },
    "lastname": {
      type: Sequelize.STRING
    },
    'email': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    'password': {
      type: Sequelize.STRING(64),
      is: /^[0-9a-f]{64}$/i
    }, 
    'role':{
      type : Sequelize.STRING,
      allowNull : false
    }

  }, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false
  });
  return Users
};