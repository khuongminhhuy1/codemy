const checkExistImage = (customMess) => (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: customMess });
  }
  next();
};

const checkExistVideo = (customMess) => (req, res, next) => {
  if (!req.file) {
    return (uploadedVideo = null);
  }
  next();
};

export { checkExistImage, checkExistVideo };
