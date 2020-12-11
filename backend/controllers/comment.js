const db = require("../models/");
const Comments = db.comments;
const Op = db.Sequelize.Op;

//création du commentaire
exports.createComment = (req, res, next) => {
  const commentaire = {
    user_id: req.body.user_id,
    post_id : req.body.post_id,
    text: req.body.text,
  };
  Comments.create(commentaire)
    .then(commentaire => {
      res.send(commentaire);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du commentaire "
      });
    });
};

//modification du commentaire
exports.modifyCom = (req, res, next) => {
  const id = req.params.id;
  Comments.update(req.body, {
    where: { comment_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le commentaires est modifié."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour le commentaires avec l'id=${id}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la mise à jour du commentaires avec l'id=" + id
      });
    });
};

//supprimer un commentaire
exports.deleteCom = (req, res, next) => {
  const id = req.params.id;

  Comments.destroy({
    where: { comment_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaire supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer le commentaire avec l'id=${id}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le commentaire avec l'id=" + id
      });
    });
};

//recupération d'un commentaire
exports.getOneCom = (req, res, next) => {
 const id = req.params.id;
Comments.findByPk(id)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message: "Problème de récupération du commentaire avec l'id=" + id
   });
 });
}

//récupération des commentaires
exports.getAllCom = (req, res, next) => {
  Comments.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
    .then(data => {
      res.send(data);
     
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la récupération des commentaires"
      });
    });
}; 