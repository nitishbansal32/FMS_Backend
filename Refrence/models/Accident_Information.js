const mongoose=require('mongoose');
const Accident_Information = mongoose.Schema({
    accident_number:{type:Number,required:true},
    accident_date:{type:Date,required:true},
   accident_time:{type:String,required:true},
   driver_name:{type:String,required:true},
   driver_licene_number:{type:String,required:true},
   tractor_number:{type:String,required:true},
   location:{type:"String",required:true},
   accident_type:{type:"String",required:true},
   damage:{type:String,enum:['Y','N'],default:'N'},
   towing:{typing:String,enum:['Y','N'],default:'N'},
   police_report_number:{type:"String",required:true},
   police_report_number:{type:"String",required:true},
   police_officer:{type:String,required},
   company_accident_report:{type:String,required},
   claim_number:{type:Number,required},
   adjuster:{type:String},
   driver_charged:{type:String,enum:['No','Yes'],default:'No'},
   action_taken:{type:String,enum:['No','Yes'],default:'No'},
   cause_of_accident:{type:String,required},
   preventable:{type:String,enum:['No','Yes'],default:'No'},
   const:{type:Number,default:0},
   comments:{type:String,default:'None'},
   driver_statement:{type:String,default:'None'}


 



    
    
 });
 module.exports = mongoose.model('Accident',Accident_Information );
     
     


