export const checkUserRole = (requiredRole) => (req, res, next) => {
  // Kiểm tra nếu người dùng có quyền cần thiết
  if (req.body && req.body.role === requiredRole) {
    return next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};
export default { checkUserRole };
