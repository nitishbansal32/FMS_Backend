const mongoose=require('mongoose');
const Accident_Information = mongoose.Schema({
    accident_number:{type:Number,required:true},
    accident_date:{type:Date,required:true},
   accident_time:{type:String,required:true},
   driver_name:{type:String,required:true},
   driver_licene_number:{type:String,required:true},
   tractor_number:{type:String,required:true},
   location:{type:String,required:true},
   accident_type:{type:String,required:true},
   damage:{type:String,enum:['Y','N'],default:'N'},
   towing:{type:String,enum:['Y','N'],default:'N'},
   
   police_report_number:{type:"String",required:true},
   police_officer:{type:String,required:true,default:"NA"},
   company_accident_report:{type:String},
   claim_number:{type:Number},
   adjuster:{type:String},
   driver_charged:{type:String,enum:['No','Yes'],default:'No'},
   action_taken:{type:String,enum:['No','Yes'],default:'No'},
   cause_of_accident:{type:String},
   preventable:{type:String,enum:['No','Yes'],default:'No'},
   const:{type:Number,default:0},
   comments:{type:String,default:'None'},
   driver_statement:{type:String,default:'None'},
   company_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'},


 



    
    
 });
 module.exports = mongoose.model('Accident',Accident_Information );
     
     


