const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloud config
cloudinary.config({
    cloud_name: "ddo7w4uot",
    api_key: "281312732845772",
    api_secret: "C5t2d3ofux5swJgatmu-n66p1T0",
});

// storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "jpeg", "png", "svg"],
    filename: (req, files, cb) => {
        cb(null, Date.now() + "_" + files.originalname.split(".")[0]);
    },
});

const uploader = multer({
    storage: storage,
});

module.exports = uploader;