const mongoose=require('mongoose');
const Trackter_Inventory = mongoose.Schema({
    unit:{type:String,required:true},
    year:{type:Number,required:true},
    made_by:{type:String,required:true},
    color:{type:String,required:true},
    description:{type:String,required:true},
    description:{type:String,required:true},
    VIN:{type:String,required:true},
    ELD:{type:String},
    terminal:{type:String,required:true},
    ownership:{type:String,required:true},
    licence_plate:{type:String,required:true},
    number_of_axles:{type:Number,required:true},
    weight:{type:Number,required:true},
    tyre_size:{type:Number},
    standard_job:{type:String},
    annual_inspection:{type:Date,required:true},
    next_annual_inspection:{type:Date},
    safety_expiry_date:{type:Date,required:true},
    status:{type:String,enum: ['active', 'inactive','safety due'],required:true,default:'active'},
    plate_expiry_date:{type:Date,required:true,default:'no expiry'},
    //PM1:{type:Date,default:0000-00-00},
    //PM2:{type:Date,default:0000-00-00},
   // PM3:{type:Date,default:0000-00-00},
    days_remaining_for_next_inspection:{type:Number},
    mechanical_notes: {type:String },
 });
 /* Trackter_Inventory.pre('save', function(next) {
    const curr = new Date();
     
     
     if(curr>this.safety_expiry_date)
     {
        this.status='active';
        let clone_Date = new Date( this.annual_inspection.getTime());
        clone_Date.setMonth(clone_Date.getMonth() + 3);
        this.PM1=new Date(clone_Date.getTime());
        clone_Date.setMonth(clone_Date.getMonth() + 3);
        this.PM2=new Date(clone_Date.getTime());
        clone_Date.setMonth(clone_Date.getMonth() + 3);
        this.PM3=new Date(clone_Date.getTime());
        if(curr<PM1)
        {
          const rem = this.PM1.getTime()-curr.getTime();
          this.days_remaining_for_next_inspection=rem;

        }
        else if(curr<PM2)
        {
        const rem = this.PM2.getTime()-curr.getTime();
        this.days_remaining_for_next_inspection=rem;
        
       }
       else
       {
        const rem = this.PM3.getTime()-curr.getTime();
        this.days_remaining_for_next_inspection=rem;
       }
    }
    else
    {
      
        this.status='safety due';
    }


    next();
});*/

module.exports = mongoose.model('Tractor', Trackter_Inventory);