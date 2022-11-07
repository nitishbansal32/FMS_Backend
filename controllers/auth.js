const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
  let{ email, name, password ,role} = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

 
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const isSecondAccount = (await User.countDocuments({})) === 1;

  if(isFirstAccount)
  {
    role='super-admin';
    const company_id='6366b9f1ccfe052e38f3370e'
    const new_user = await User.create({ name, email, password, role ,company_id});
    //const tokenUser = createTokenUser(new_user);
     //attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ new_user});
    return;
  }
 else if(isSecondAccount)
  {
    role='sub-super-admin';
     const company_id=req.user.company;
     const new_user = await User.create({ name, email, password, role,company_id });
    // const tokenUser = createTokenUser(new_user);
    //attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ new_user});
    return;

  }
 // console.log(req.user)
  
  if(!req.body.company_id)
  {
    req.body.company_id=req.user.company;
  }
  //req.body.company_id=req.user.company; 

  const new_user = await User.create(req.body);
  //const tokenUser = createTokenUser(user);
 // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: new_user});
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  //console.log(req.user);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
 
};
