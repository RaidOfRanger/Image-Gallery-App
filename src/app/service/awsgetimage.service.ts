import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
import { initializeApp } from "firebase/app";

import { HttpClient } from '@angular/common/http';
import { getDatabase } from "firebase/database";
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AwsgetimageService {

  app = initializeApp(environment.firebaseConfig);
  database = getDatabase(this.app);


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

  }
  ngDocheck() {

  }
  getImageUrl(bucketName: string, key: string | undefined): string {

    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }




}
