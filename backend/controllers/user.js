const db = require("../models/");
const Users = db.user;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let role = "";
exports.signup = (req, res, next) => {
  if(req.body.email === "marion.touin@groupomania.com"){
    role = "MODO"
  }else {
    role = "USER"
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = {
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        role : role,
        password: hash
      };
      Users.create(user)
      .then(user => {
        res.send({user,
          message : "Utilisateur bien enregistré"
        
        });
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
        });
      });
    })
    .catch(error => res.status(500).json({ error }));


};
exports.login = (req, res, next) => {
  Users.findOne({
    where: { email: req.body.email }
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else {
              res.status(201).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: "10h"}),
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  const id = req.params.id;
  const newProfile = req.body ? {
    firstname: req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : hash,
 } : {
  firstname: req.body.firstname,
  lastname : req.body.lastname,
  email : req.body.email,
  password : hash,
    } 
  Users.update(newProfile, {
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur modifié."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour l'utilisateur avec l'id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la mise à jour id=" + id
      });
    });
  })
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  Users.destroy({
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer id=${id}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Users with id=" + id
      });
    });
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
}

exports.getAllUser = (req, res, next) => {
 Users.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};