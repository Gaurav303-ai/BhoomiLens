const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            `${crypto.randomUUID()}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        console.log("========== FILE DEBUG ==========");
        console.log("Original name:", file.originalname);
        console.log("MIME type:", file.mimetype);
        console.log("================================");

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];
        const allowedExtensions = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];

        if (allowedTypes.includes(file.mimetype) ||
            allowedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, JPEG and PNG files can be uploaded."));
        }
    }
});

module.exports = upload;