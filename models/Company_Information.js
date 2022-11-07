const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, 'Please provide a company name'],
    minlength: 3,
    maxlength: 50,
     unique: true,
  },
  address: {
    type: String,
    unique: true,
    required: [true, 'Please provide company address'],
    
  },
  Date_of_payment:
    {
    type:Date,
    required:[true,'Please provide Date_of_Payment']
   },
   Transaction_id:
   { 
     type:String,
     required:true
   },
   Amount:
   {
    type:Number,
    required:true
   }
   ,
   additional_notes:
   {
    type:String,
    default:"None"
   }
   
  
});



module.exports = mongoose.model('Company', CompanySchema);