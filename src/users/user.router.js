const router = require('express').Router()
const passport = require('passport')
const userServices = require('./users.services')

/* const patchMyUser = (req, res) => {
 const id = req.users.id
 const { firstName, lastName, phone, gender, country}
} */

require('../middlewares/auth.middleware')(passport)

//esto sirve para proteger tu ruta solo estas 3 lineas de codigo no olvides de importar el require('passport')
router.get('/',
        passport.authenticate('jwt', {session: false}), 
userServices.getAllUsers)


// /api/v1/users/:id
router.route('/:id')
.get(userServices.getUserById)
.patch(userServices.patchUser)
.delete(userServices.deleteUser)

//ruta de informaicon propia del usuario loggeado
router.route('/me')
.get(
    passport.authenticate('jwt',{session: false}),
    userServices.getMyUser)
    // /api/v1/users/me
        .patch(
            passport.authenticate('jwt',{session: false}),
            userServices.patchMyUser)
        .delete(
            passport.authenticate('jwt',{session: false}),
            userServices.deleteMyUser)
 
module.exports = router