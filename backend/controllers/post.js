const sequelize = require('../connexiondb');
const { Sequelize, DataTypes } = require('sequelize');
const Post = require('../models/post')(sequelize, DataTypes);
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPost = (req, res, next) => {
  const createPost = req.body
  //const postObject = JSON.parse(req.body.post);
  //delete postObject._id;
  const post = new Post({
    ...createPost,
  //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sequelize.query(`INSERT INTO post (titre,imageUrl) VALUES ('${post.titre}','${post.imageUrl}')`)
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
  
exports.modifyPost = (req, res, next) => {
  const post /*Object*/= req.body
  sequelize.query(`UPDATE post SET titre='${post.titre}',imageUrl='${post.imageUrl}' WHERE id= '${req.params.id}'`)
  //req.file ?
   // {
      //...JSON.parse(req.body.post),
    //  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  // } : { ...req.body };
  //Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  sequelize.query(`DELETE FROM post WHERE id ='${req.params.id}' `)
  //Post.findOne({ _id: req.params.id })
    //.then(post => {
      //const filename = post.imageUrl.split('/images/')[1];
      //fs.unlink(`images/${filename}`, () => {
       // Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      //});
    //})
    //.catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  sequelize.query("SELECT * FROM post")
      .then(post => res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllPost = (req, res, next) => {
    sequelize.query("SELECT * FROM post")
       .then(posts => res.status(200).json(posts))
       .catch(error => res.status(400).json({ error }));
   };