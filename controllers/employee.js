const User=require('../models/User');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const e = require('express');
    const getAllEmployees=async(req,res)=>
  {
    const employees = await User.find({});
     res.status(StatusCodes.OK).json({ employees, count: employees.length });
  }
    const getCurrEmployees=async(req,res)=>
  {
    const employees = await User.find({company_id:req.user.company});
     res.status(StatusCodes.OK).json({ employees, count: employees.length });
  }
  const updateEmployee=async(req,res)=>
{
    const { id: name} = req.params;
  const employee= await User.findOneAndUpdate({ employee_name:name,company_id:req.user.company },req.body, {
    new: true,
    runValidators: true,
  });
  if (!employee) {
     throw new CustomError.NotFoundError(`No employee with name: ${name} found`)
   
  }}
 
 module.exports={getAllEmployees,getCurrEmployees,updateEmployee};