const mongoose=require('mongoose');
const Trackter_Inventory = mongoose.Schema({
    unit:{type:String,required:true,unique:true},
    year:{type:Number,required:true},
    made_by:{type:String,required:true},
    color:{type:String,required:true},
    description:{type:String},
    
    VIN:{type:String},
    ELD:{type:String},
    terminal:{type:String},
    ownership:{type:String},
    licence_plate:{type:String},
    number_of_axles:{type:Number},
    weight:{type:Number},
    tyre_size:{type:Number},
    standard_job:{type:String},
    annual_inspection:{type:Date,required:true},
    next_annual_inspection:{type:Date},
    safety_expiry_date:{type:Date,required:true},
    status:{type:String,enum: ['active', 'inactive','safety due'],default:"active"},
    plate_expiry_date:{type:Date,required:true},
    PM1:{type:Date},
    PM2:{type:Date},
    PM3:{type:Date},
    days_remaining_for_next_inspection:{type:Number},
    mechanical_notes: {type:String },
    is_active:
   {
    type:Boolean,
    default:true
   },
     company_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'}
 });
  Trackter_Inventory.pre('save', function(next) {
    const curr = new Date();
     let day = curr.getDate();
     let month = curr.getMonth() + 1;
     let year = curr.getFullYear();
     
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
        
    }
    else
    {
        this.status='safety due';
    }


    next();
},{timestamps: true});

module.exports = mongoose.model('Tractor', Trackter_Inventory);