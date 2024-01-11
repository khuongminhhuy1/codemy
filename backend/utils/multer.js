import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    console.log(file,'file')
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
      return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
  }
});

const upload = (fileName) => {
  return multer({ storage: storage }).single(fileName);
};

export { upload };

//Videos
const VideoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.mp4' && ext !== '.avi' && ext !== '.mov' && ext !== '.wmv') {
      return cb(new Error('Only video files are allowed'))
    }
    cb(null, true)
  }
});

const videoUpload = (fileName) => {
  return multer({ storage: VideoStorage }).single(fileName);
};

export { videoUpload };

//avatar Storage
const AvatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
      return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
  }
});

const avatarUpload = (fileName) => {
  return multer({ storage: AvatarStorage }).single(fileName);
};

export { avatarUpload };
