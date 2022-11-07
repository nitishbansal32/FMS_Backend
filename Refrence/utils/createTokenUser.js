const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role ,company:user.company};
};

module.exports = createTokenUser;
