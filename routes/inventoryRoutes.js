const express=require('express')
const app=express();
const router=express.Router();
const {createTractor,getAllTractors,getSingleTractor,deleteTractor,updateTractor,getCurrTractors}=require('../controllers/inventory');
const { authenticateUser, authorizePermissions,} = require('../middleware/authentication');
router
  .route('/tractors')
  .get(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),getAllTractors);
router
  .route('/tractors/currTractors')
  .get(authenticateUser,getCurrTractors);
router.
route('/tractors/:id')
.get(authenticateUser,getSingleTractor);

 router.
route('/tractors/createTractor')
.post(authenticateUser,authorizePermissions('admin','employee'),
createTractor);
 router.
route('/tractors/:id')
.patch(authenticateUser,authorizePermissions('super-admin','sub-super-admin','admin'),
updateTractor);
router.
route('/tractors/:id')
.delete(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
deleteTractor);
module.exports=router;
