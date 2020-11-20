const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

const commentCtrl = require('../controllers/comment');
const multer = require('../middleware/multer-config');

//créer un post
router.post('/', commentCtrl.createComment);
//modifier un post
router.put('/:id', commentCtrl.modifyComment);
//supprimer un post
router.delete('/:id', commentCtrl.deleteComment);
//affichage d'un post spécifique
router.get('/:id', commentCtrl.getOneComment);
//récupération d'un post
router.get('/', commentCtrl.getAllComment);

module.exports = router;