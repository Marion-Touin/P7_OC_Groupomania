  
const multer = require('../middleware/multer-config');
module.exports = app => {
    var router = require("express").Router();
    const post = require("../controllers/post.js");


    const auth = require('../middleware/auth');
    


    //post un article
    router.post('/', auth, multer, post.createPost)
    //modifier un article
    router.put('/:id', auth, multer,post.modifyPost);
    //supprimer la route
    router.delete('/:id', auth,post.deletePost);
    //route pour un article en fonction d'orderId
    router.get('/:id', auth,post.getOnePost)
    // route pour tout les articles
    router.get('/', auth, post.findAll);

   app.use('/api/post', router)
}