module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ msg: "You are not authorized to view this resource" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    return res.status(401).json({ msg: "Admin only resource." });
  }
};
