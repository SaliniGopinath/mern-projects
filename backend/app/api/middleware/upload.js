import multer from 'multer';
import path from 'path';

const  storage = () => {
        var storage = multer.diskStorage({
            destination: 'public/files',
            filename : (req,file,cb) => {
                cb(null,Date.now() + "_" + file.originalname);
            }
        })
        return storage;
    };

const allowedFile = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

export default {
  files: {
    storage,
    allowedFile
  }
};


