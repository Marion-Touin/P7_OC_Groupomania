module.exports = app => {

    const userCtrl = require('../controllers/user'); 
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.put('/:id', auth, userCtrl.modifyUser);
    router.delete('/:id',auth, userCtrl.deleteUser);
    router.get('/:id',auth,  userCtrl.getOneUser)
    router.get('/',  userCtrl.getAllUser);

   app.use('/api/auth', router)
}