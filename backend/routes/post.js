  
const multer = require('../middleware/multer-config');
module.exports = app => {
    var router = require("express").Router();
    const post = require("../controllers/post.js");

    const auth = require('../middleware/auth');
    
    //créer un post
    router.post('/', auth, multer, post.createPost);
    //modifier un post
    router.put('/:id', auth, multer,post.modifyPost);
    //supprimer un post
    router.delete('/:id', auth,post.deletePost);
    //route pour trouver un post
    router.get('/:id', auth,post.getOnePost)
    // route pour tout les posts
    router.get('/', auth, post.findAll);

   app.use('/api/post', router)
}