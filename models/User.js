const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  last_name:
  {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  }, 
  employee_id: {
    type: String,
     required: [true, 'Please provide Id of employee'],
   
  },
  location:
  {
    type:String,
    required:true
  },
  title:
  {
    type:String,
    required:true,
    default:"None"
  },
 supervisor:
  {
    type:String,
    required:true,
    default:"None"
  },
  shift:
  {
    type:String,
    required:true,
    enum:["AM","PM"],


  },
  contact:
  {
    type:String,
    required:true
    
  },
 emergency_contact:
  {
    type:String,
    required:true
    
  },
  DOB:
  {
    type:Date,
    required:true
  },
  start_date:
  {
     type:Date,
    required:true
  },
  employee_type:
  {
    type:String,
    required:true,
    enum:["Full Time","Part Time","Contract","Seasonal","Intern","Temporary"],
    default:"Full Time"

  },
  phone_number:
  {
    type:String,
    required:true

  },
  address:
  {
    type:String,
    required:true,
     minlength:50,
    maxlength: 500,
  },
  city:
  {
    type:String,
    required:true,
     minlength:3,
    maxlength:50,
  },
   province:
  {
    type:String,
    required:true,
     minlength:3,
    maxlength:50,
  },
  postal_code:
  {
   type:String,
    required:true,
     minlength:3,
    maxlength:10,
  },
  country:
  {
     type:String,
    required:true,
     minlength:3,
    maxlength:10,
    default:"Canada"
  },
  CVOR_points:
  {
    type:Number
  },
  employee_documents:
  {
    documents:[{type:String}]
  },
  








    role: {
    type: String,
    enum: ['admin', 'employee','insurance-company','super-admin','sub-super-admin'],
    default:'employee'
    
  },

  
  company_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    
    
  },
  is_active:
  {
    type:Boolean,
    required:true,
    default:true

  }

},{timestamps: true});

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
