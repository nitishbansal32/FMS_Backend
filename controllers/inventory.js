const Tractor=require('../models/Tracktor_Inventory');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const createTractor = async (req, res) => {
     req.body.company_id=req.user.company;
    const entry = await Tractor.create(req.body);
    res.status(StatusCodes.CREATED).json({ entry });
   
  };
    const getAllTractors=async(req,res)=>
  {
    const tractors = await Tractor.find({});
     res.status(StatusCodes.OK).json({ tractors, count: tractors.length });
  }
    const getCurrTractors=async(req,res)=>
  {
    const tractors = await Tractor.find({company_id:req.user.company});
     res.status(StatusCodes.OK).json({ tractors, count: tractors.length });
  }
    const getSingleTractor=async(req,res)=>
  {
     const { id:tractor_unit} = req.params;
  const tractor= await Tractor.findOne({ unit:tractor_unit });
  if (!tractor) {
   
    throw new CustomError.NotFoundError(`No tractor with unit: ${tractor_unit} found`)
   
  }
  
  res.status(StatusCodes.OK).json({ tractor});
  }
    const deleteTractor=async(req,res)=>
  {
      const { id:tractor_unit} = req.params;
  const tractor= await Tractor.findOne({ unit:tractor_unit });
  if (!tractor) {
    throw new CustomError.NotFoundError(`No tractor with unit: ${tractor_unit} found`)
  }
    await tractor.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! tractor removed.' });

 
}
   const updateTractor=async(req,res)=>
  {
     const { id:tractor_unit} = req.params;
  const tractor= await Tractor.findOneAndUpdate({ unit:tractor_unit },req.body, {
    new: true,
    runValidators: true,
  });
  if (!tractor) {
    res.send(`No tractor with unit: ${tractor_unit} found`);
    return;
  }
  
  res.status(StatusCodes.OK).json({ tractor});
  }
module.exports={createTractor,getAllTractors,getSingleTractor,deleteTractor,updateTractor,getCurrTractors};