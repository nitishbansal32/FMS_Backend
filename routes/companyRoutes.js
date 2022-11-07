const express=require('express')
const app=express();
const router=express.Router();
const {createCompany,getAllCompanies,getSingleCompany,deleteCompany,updateCompany}=require('../controllers/company');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router
  .route('/companies')
  .get(authenticateUser, authorizePermissions('super-admin','sub-super-admin'), getAllCompanies);

router.
route('/companies/:id')
.get(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
getSingleCompany);

 router.
route('/companies/createCompany')
.post(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
createCompany);
 router.
route('/companies/:id')
.patch(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
updateCompany);
router.
route('/companies/:id')
.delete(authenticateUser,authorizePermissions('super-admin','sub-super-admin'),
deleteCompany);
module.exports=router;