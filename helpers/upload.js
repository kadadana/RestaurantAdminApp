import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve("public/pics");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const customName = req.body.id;
        if (!customName) {
            return cb(new Error("Product id missing!"));
        }

        const filename = customName + ".jpeg";
        const filePath = path.join(uploadDir, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        req.generatedFileName = filename;
        cb(null, filename);
    }
});

export const upload = multer({ storage });
