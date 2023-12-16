const checkUserRole = (req, res, next) => {
  if (req.headers && req.headers.authorization === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};
export { checkUserRole };
