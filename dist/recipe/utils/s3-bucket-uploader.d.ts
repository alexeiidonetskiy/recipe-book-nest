/// <reference types="node" />
import * as AWS from 'aws-sdk';
export declare const uploadImageToS3: (buffer: Buffer, contentType: string, filename: string) => Promise<AWS.S3.ManagedUpload.SendData>;
