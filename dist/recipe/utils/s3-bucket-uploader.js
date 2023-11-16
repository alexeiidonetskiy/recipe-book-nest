"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToS3 = void 0;
const AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
const uploadImageToS3 = async (buffer, contentType, filename) => {
    const params = {
        Bucket: 'recipebook-test-bucket',
        Key: filename,
        Body: buffer,
        ContentType: contentType,
    };
    return s3.upload(params).promise();
};
exports.uploadImageToS3 = uploadImageToS3;
//# sourceMappingURL=s3-bucket-uploader.js.map