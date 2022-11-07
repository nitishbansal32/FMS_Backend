const express=require('express')
const app=express();
const router=express.Router();
const { authenticateUser, authorizePermissions,} = require('../middleware/authentication');
const {createAccident,getAllAccidents,getSingleAccident,deleteAccident,
  updateAccident,getCurrAccidents}=require('../controllers/accident');

router
  .route('/accidents')
  .get(authenticateUser, authorizePermissions('super-admin','sub-super-admin'), getAllAccidents);
router
  .route('/accidents/currAccidents')
  .get(authenticateUser, getCurrAccidents);
router.
route('/accidents/:id')
.get(authenticateUser,authorizePermissions('super-admin','sub-super-admin','admin'),
 getSingleAccident);

 router.
route('/accidents/createAccident')
.post(authenticateUser,authorizePermissions('admin','employee'),
createAccident);
 router.
route('/accidents/:id')
.patch(authenticateUser,authorizePermissions('admin'),
updateAccident);
router.
route('/accidents/:id')
.delete(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
deleteAccident);


module.exports=router;