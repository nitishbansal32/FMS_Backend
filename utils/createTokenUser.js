
const createTokenUser = (user) => {
  if(!user.company_id)
  {
    user.company_id='6366b9f1ccfe052e38f3370e';
  }
  return { name: user.name, userId: user._id, role: user.role ,company:user.company_id};
};

module.exports = createTokenUser;
