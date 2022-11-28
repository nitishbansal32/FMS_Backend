const express=require('express')
const app=express();
const router=express.Router();
const { register, login, logout ,updateUserPassword} = require('../controllers/auth');
const { authenticateUser, authorizePermissions,} = require('../middleware/authentication');
router.route('/login')
.post(
login);
router.route('/updatePassword')
.patch(authenticateUser,updateUserPassword);

router.route('/register')
.post(authenticateUser,authorizePermissions("super-admin","sub-super-admin","admin"),
register);
router.get('/logout', logout);

module.exports = router;