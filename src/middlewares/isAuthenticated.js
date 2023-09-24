function isAuthenticated(req, res, next) {
  if (!req.session && !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    return next();
  }
}

module.exports = isAuthenticated;
