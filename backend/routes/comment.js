module.exports = app => {
    const comCtrl = require('../controllers/comment'); 
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    router.post('/', auth, comCtrl.createComment);
    router.put('/:id', auth, comCtrl.modifyCom);
    router.delete('/:id',auth, comCtrl.deleteCom);
    router.get('/:id',auth,  comCtrl.getOneCom)
    router.get('/', auth, comCtrl.getAllCom);

   app.use('/api/comment', router)
}