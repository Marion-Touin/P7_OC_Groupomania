module.exports = app => {

    const userCtrl = require('../controllers/user'); 
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.put('/:id',  userCtrl.modifyUser);
    router.delete('/:id', userCtrl.deleteUser);
    router.get('/:id', userCtrl.getOneUser)
    router.get('/',  userCtrl.getAllUser);

   app.use('/api/auth', router)
}