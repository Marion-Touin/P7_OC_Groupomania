  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../connexiondb');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/user') (sequelize, DataTypes);


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({ 
          firstname : req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash
        });
        sequelize.query(`INSERT INTO users(firstname, lastname, email, password) VALUES('${user.firstname}','${user.lastname}','${user.email}','${user.password}')`)
          .then(() => res.status(201).json({ message: 'Votre compte à bien été créer !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ error });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  const user = req.body
  sequelize.query(`UPDATE users SET firstname='${user.firstname}',lastname='${user.lastname}',email='${user.email}',password='${user.password}' WHERE user_id= '${req.params.id}'`)
  .then(() => res.status(200).json({ message: 'Information utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  sequelize.query(`DELETE FROM users WHERE user_id ='${req.params.id}' `)
  .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};