var checkStudent = (req, res, next) => {
  var role = req.data.role;
  if (role === "student" || role === "teacher" || role === "admin") {
    next();
  } else {
    res.json("No Permission");
  }
};

var checkAdmin = (req, res, next) => {
  var role = req.data.role;
  if (role === "admin") {
    next();
  } else {
    res.json("No Permission");
  }
};

export default { checkStudent, checkTeacher, checkAdmin };
