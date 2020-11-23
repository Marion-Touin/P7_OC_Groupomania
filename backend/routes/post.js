const express = require('express');
const router = express.Router();

const Post = require('../models/post');

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

//créer un post
router.post('/',multer, postCtrl.createPost);
//modifier un post
router.put('/:id',multer, postCtrl.modifyPost);
//supprimer un post
router.delete('/:id', postCtrl.deletePost);
//affichage d'un post spécifique
router.get('/:id', postCtrl.getOnePost);
//récupération d'un post
router.get('/', postCtrl.getAllPost);

module.exports = router;