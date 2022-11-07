const Accident=require('../models/Accident_Information')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const createAccident= async (req, res) => {
    req.body.company_id=req.user.company;
    const entry = await Accident.create(req.body);
    res.status(StatusCodes.CREATED).json({ entry });
   
  };
  const getAllAccidents=async(req,res)=>
  {
    const accidents = await Accident.find({});
     res.status(StatusCodes.OK).json({ accidents, count: accidents.length });
  }
  const getCurrAccidents=async(req,res)=>
  {
    const accidents = await Accident.find({company_id:req.user.company});
     res.status(StatusCodes.OK).json({ accidents, count: accidents.length });
  }

  const getSingleAccident=async(req,res)=>
  {
    const { id: number} = req.params;
  const accident = await Accident.findOne({ accident_number: number });
  if (!accident) {
    throw new CustomError.NotFoundError(`No accident with accident number : ${accident_number} found`)
 
    
  }
  res.status(StatusCodes.OK).json({accident})
}
  const deleteAccident=async(req,res)=>
  {
      const { id:number} = req.params;

  const accident = await Accident.findOne({ accident_number: number });

  if (!accident) {
    throw new CustomError.NotFoundError(`No accident with accident number : ${accident_number} found`)
  }
  await accident.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! accident removed.' });
};
const updateAccident = async (req, res) => {
   const { id:number} = req.params;

  const accident = await Accident.findOneAndUpdate({accident_number: number   }, req.body, {
    new: true,
    runValidators: true,
  });

 if (!accident) {
     throw new CustomError.NotFoundError(`No accident with accident number : ${accident_number} found`);
  
  }

  res.status(StatusCodes.OK).json({ accident });
};

  
  
  
  
  
  
 module.exports={createAccident,getAllAccidents,getSingleAccident,deleteAccident,updateAccident,getCurrAccidents}; 