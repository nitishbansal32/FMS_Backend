const Company=require('../models/Company_Information')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const createCompany= async (req, res) => {
    
    const entry = await Company.create(req.body);
    res.status(StatusCodes.CREATED).json({ entry });
   
  };
   const getAllCompanies=async(req,res)=>
  {
    const companies= await Company.find({});
     res.status(StatusCodes.OK).json({ companies, count: companies.length });
  }
    const getSingleCompany=async(req,res)=>
  {
    const { id: name} = req.params;
   const company= await Company.findOne({ company_name:name });
   if (!company) {
    throw new CustomError.BadRequestError(`No company with name: ${name} found`)
    
    
  }
  
  
  res.status(StatusCodes.OK).json({ company});
  }
   const deleteCompany=async(req,res)=>
  {
     const { id: name} = req.params;
  const company= await Driver.findOne({ company_name:name });
  if (!company) {
    

    throw new CustomError.NotFoundError(`No company with name: ${name} found`)
  }
  await company.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! company removed.' });
}
const updateCompany=async(req,res)=>
{
    const { id: name} = req.params;
  const company= await Company.findOneAndUpdate({ company_name:name },req.body, {
    new: true,
    runValidators: true,
  });
  if (!company) {
     throw new CustomError.NotFoundError(`No company with name: ${name} found`)
   
  }
  
  
  res.status(StatusCodes.OK).json({ company});
}

  module.exports={createCompany,getAllCompanies,getSingleCompany,deleteCompany,updateCompany};