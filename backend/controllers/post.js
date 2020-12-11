const db = require("../models/");
const Posts = db.post;
const Op = db.Sequelize.Op;

//création du post
exports.createPost = (req, res, next) => {
  const post = {
    userId: req.body.userId,
    title: req.body.title,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  };
  Posts.create(post)
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de l'article "
      });
    });
};

//modifier le post
exports.modifyPost = (req, res, next) => {
  const id = req.params.id;
  const modification = req.file ? {
    userId: req.body.userId,
    title: req.body.title,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  } : {    
    userId: req.body.userId,
    title: req.body.title,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  }
    
  Posts.update(modification, {
    where: { post_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "L'article est modifié"
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour l'article avec l'id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la mise à jour de l'article avec l'id=" + id
      });
    });
};

//supprimer un post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Posts.destroy({
    where: { post_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "le post à bien été supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'article avec l'id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la suppression de l'article avec l'id=" + id
      });
    });
};

//récupérer un post
exports.getOnePost = (req, res, next) => {
 const id = req.params.id;
Posts.findByPk(id)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message: "Problème de récupération de l'article avec l'id=" + id
   });
 });
}

//réupérer tout les posts
exports.findAll = (req, res, next) => {
  Posts.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la récupération des articles"
      });
    });
};