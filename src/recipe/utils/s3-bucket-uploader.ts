import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadImageToS3 = async (buffer: Buffer, contentType: string, filename: string) => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'recipebook-test-bucket',
    Key: filename,
    Body: buffer,
    ContentType: contentType,
  };

  return s3.upload(params).promise();
};
