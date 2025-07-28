const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["png", "jpg"],
  params: {
    folder: "autootpad-api",
    transformation: [{ width: 1280, height: 720, crop: "limit" }],
  },
});

module.exports = storage;
