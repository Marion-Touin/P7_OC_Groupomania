module.exports = (sequelize, Sequelize) => {
    const Comments =  sequelize.define('comments', {
       'comment_id': {
         type: Sequelize.INTEGER(11),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
       },
       'user_id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        requierd: true
      },
      'post_id': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        requierd: true
      },
       'text': {
         type: Sequelize.STRING,
         allowNull: false,
         required: true
       },
       'createdAt': {
         allowNull: false,
         type: Sequelize.DATE,
         defaultValue: Sequelize.NOW,
       },
      'updatedAt': {
         allowNull: false,
         type: Sequelize.DATE,
         defaultValue: Sequelize.NOW,
       },
   
     }, {
       tableName: 'comments',
       freezeTableName: true
     });
     return Comments
   };