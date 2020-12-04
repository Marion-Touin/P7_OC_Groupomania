const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');
const multer = require('../middleware/multer-config');

//créer un post
router.post('/', auth, commentCtrl.createComment);
//modifier un post
router.put('/:id', auth, commentCtrl.modifyComment);
//supprimer un post
router.delete('/:id', auth, commentCtrl.deleteComment);
//affichage d'un post spécifique
router.get('/:id', auth, commentCtrl.getOneComment);
//récupération d'un post
router.get('/', auth, commentCtrl.getAllComment);

module.exports = router;