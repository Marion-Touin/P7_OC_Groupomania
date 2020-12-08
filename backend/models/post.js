module.exports = (sequelize, Sequelize) => {
    const Posts =  sequelize.define('posts', {
       'post_id': {
         type: Sequelize.INTEGER(11),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
       },
       'userId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        requierd: true
      },
       'title': {
         type: Sequelize.STRING,
         allowNull: false,
         required: true,
         unique: true
       },
       'image_url': {
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
       tableName: 'posts',
       freezeTableName: true
     });
     return Posts
   };