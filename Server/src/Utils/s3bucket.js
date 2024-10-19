const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: "ap-south-1", // this is the region that selected in AWS account
});

const storage = multerS3({
    s3: s3,
    bucket: "sanins3bucket", // bucket name
    acl: "public-read", // Set the ACL for the uploaded file
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the correct Content-Type
    contentDisposition: "inline", // Ensure the file is displayed inline
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + "-" + file.originalname);
    },
});
console.log("setttttt");
// Initialize multer with disk storage
const upload = multer({ storage: storage });

module.exports = { upload };
