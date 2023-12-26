import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AWSImageUploadService {

  s3 = new AWS.S3(environment.config);
  constructor() { }

  uploadFile(file: File, bucketName: string): Observable<number> {
    return new Observable<number>((observer) => {
      const params = {
        Bucket: environment.config.bucketName,
        Key: environment.config.dirName +'/'+ file.name,
        Body: file,
        ACL: 'public-read' ,// Set the appropriate ACL based on your requirements
        ContentType:file.type
      };

      // Create an S3 upload manager
      const uploader = this.s3.upload(params);

      // Track the upload progress
      uploader.on('httpUploadProgress', (progress) => {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        observer.next(percentage);
      });

      // Handle upload completion
      uploader.send((error, data) => {
        if (error) {
          observer.error(error);
        } else {
          observer.complete();
        }
      });
    });
  }
}
