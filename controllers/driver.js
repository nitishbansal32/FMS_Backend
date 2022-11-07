const Driver=require('../models/Driver_Information')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const createDriver = async (req, res) => {
     req.body.company_id=req.user.company;
    const entry = await Driver.create(req.body);
    res.status(StatusCodes.CREATED).json({ entry });
   
  };
   const getAllDrivers=async(req,res)=>
  {
    const drivers = await Driver.find({});
     res.status(StatusCodes.OK).json({ drivers, count: drivers.length });
  }
   const getCurrDrivers=async(req,res)=>
  {
    const drivers = await Driver.find({company_id:req.user.company});
     res.status(StatusCodes.OK).json({ drivers, count: drivers.length });
  }
    const getSingleDriver=async(req,res)=>
  {
    const { id: name} = req.params;
   const driver= await Driver.findOne({ employee_name:name });
   if (!driver) {
    throw new CustomError.BadRequestError(`No driver with name: ${name} found`)
    
    
  }
  
  
  res.status(StatusCodes.OK).json({ driver});
  }
   const deleteDriver=async(req,res)=>
  {
     const { id: name} = req.params;
  const driver= await Driver.findOne({ employee_name:name });
  if (!driver) {
    

    throw new CustomError.NotFoundError(`No driver with name: ${name} found`)
  }
  await driver.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! driver removed.' });
}
const updateDriver=async(req,res)=>
{
    const { id: name} = req.params;
  const driver= await Driver.findOneAndUpdate({ employee_name:name },req.body, {
    new: true,
    runValidators: true,
  });
  if (!driver) {
     throw new CustomError.NotFoundError(`No driver with name: ${name} found`)
   
  }
  
  
  res.status(StatusCodes.OK).json({ driver});
}

  module.exports={createDriver,getAllDrivers,getSingleDriver,deleteDriver,updateDriver,getCurrDrivers};