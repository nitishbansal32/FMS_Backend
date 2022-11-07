const mongoose=require('mongoose');
const Driver_Information = mongoose.Schema({
    employee_name:{type:String,required:true},
    start_date:{type:Date,required:true},
    employee_id:{type:String,required:true,unique:true},
    DL_number:{type:String,required:true},
    expiry:{type:Date,required:true},
    medical_expiry_date:{type:Date,required:true},
    terminal:{type:String,required:true},
    shift:{type:String,required:true,enum:['AM','PM']},
    employee_type:{type:String,enum:['PT','FT']},
    employee_status:{type:String,enum:['active','active']},
    phone_number:{type:String,required:true},
    emergency_contact:{type:String,required:true},
    supervisor:{type:String},
    supervisor_notes:{type:String,default:"none"},
    first_PR:{type:Date},
    semi_annual_PR:{type:Date},
    CVOR_points:{type:Number},
    employee_notes:{type:String,default:"none"},
    other:{type:String,default:"none"},
    Accidents_and_citations:{type:String,default:"none"},
    
 });
 Trackter_Inventory.pre('save', function(next) {
    
    let clone_Date = new Date(this.start_date);
    clone_Date.setMonth(clone_Date.getMonth() + 3);
    this.first_PR=new Date(clone_Date.getTime());
    clone_Date.setMonth(clone_Date.getMonth() + 3);
    this.semi_annual_PR=new Date(clone_Date.getTime());
     
     


    next();
});
module.exports = mongoose.model('Driver', Driver_Information);
