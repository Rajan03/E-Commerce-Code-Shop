 import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const checkFileType = (file, callBack) => {
    const fileTypes = /jpg|jpeg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extName && mimetype){
        return callBack(null, true);
    }else{
        return callBack("only images are allowed!")
    }
}

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload  = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
});

router.post("/", upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})
export default router;