const adminName = (req, res, next) => {
  res.locals.admin = req.session?.admin;
  next();
};

const sessionLogger = (req, res, next) => {
  console.log('ЛОГГЕР СЕССИЙ', req.session);
  next();
};

module.exports = {
  adminName,
  sessionLogger,
};
