const express=require('express')
const app=express();
const router=express.Router();
const {createDriver,getAllDrivers,getSingleDriver,deleteDriver,updateDriver,getCurrDrivers}=require('../controllers/driver');
const { authenticateUser, authorizePermissions,} = require('../middleware/authentication');
router
  .route('/drivers')
  .get(authenticateUser, getAllDrivers);
router
  .route('/drivers/currDrivers')
  .get(authenticateUser, getCurrDrivers);
router.
route('/drivers/:id')
.get(authenticateUser,getSingleDriver);

 router.
route('/drivers/createDriver')
.post(authenticateUser,authorizePermissions('admin','employee'),
createDriver);
 router.
route('/drivers/:id')
.patch(authenticateUser,authorizePermissions('super-admin','sub-super-admin','admin'),
updateDriver);
router.
route('/drivers/:id')
.delete(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
deleteDriver);
module.exports=router;