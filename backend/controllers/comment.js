const db = require("../models/");
const Comments = db.comments;
const Op = db.Sequelize.Op;


exports.createCom = (req, res, next) => {
  const commentaire = {
    user_id: req.body.user_id,
    post_id : req.body.post_id,
    text: req.body.text,
  };
  Commentaires.create(commentaire)
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

exports.modifyCom = (req, res, next) => {
  const id = req.params.id;

  Commentaires.update(req.body, {
    where: { id: id }
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

exports.deleteCom = (req, res, next) => {
  const id = req.params.id;

  Commentaires.destroy({
    where: { id: id }
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

exports.getOneCom = (req, res, next) => {
 const id = req.params.id;
Commentaires.findByPk(id)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message: "Problème de récupération du commentaire avec l'id=" + id
   });
 });
}

exports.getAllCom = (req, res, next) => {
  Commentaires.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
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