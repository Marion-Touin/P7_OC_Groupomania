const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

//créer un post
router.post('/',auth, multer, postCtrl.createPost);
//modifier un post
router.put('/:id',auth, multer, postCtrl.modifyPost);
//supprimer un post
router.delete('/:id',auth, multer, postCtrl.deletePost);
//affichage d'un post spécifique
router.get('/:id',auth, postCtrl.getOnePost);
//récupération d'un post
router.get('/',auth, postCtrl.getAllPost);

module.exports = router;