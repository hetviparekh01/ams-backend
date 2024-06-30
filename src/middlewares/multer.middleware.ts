import { Request, Response, NextFunction } from "express"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

export default upload

export const multerErrorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        res.json({ status: false, message: "Multer error: " + err.message });
    } else {
        next();
    }
};