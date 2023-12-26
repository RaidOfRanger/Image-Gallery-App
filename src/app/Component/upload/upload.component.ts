import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import AWSS3UploadAsh from 'aws-s3-upload-ash';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {MatDialog} from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { getDatabase, ref, set } from "firebase/database";
import * as AWS from 'aws-sdk';
import { tagtitleservice } from '../upload/tagtitleservice'
import {AWSImageUploadService} from '../../service/awsimage-upload.service'
import { AwsgetimageService } from 'src/app/service/awsgetimage.service';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';
// import * as s3 from 'aws-sdk/clients/s3';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: any;
  imgsrc: string | undefined;
  currentDateTime!: string;

  tagtitle = new tagtitleservice("", "")

  imgselected: boolean = false

  ProgressBar: number | null = null

 
  imageUrls?: (string| undefined)[] = []
  

  app = initializeApp(environment.firebaseConfig);
  analytics = getAnalytics(this.app);
  database = getDatabase(this.app);


  private readonly MAX_FILE_SIZE_MB = 5; 
  private readonly MAX_FILE_SIZE_BYTES = this.MAX_FILE_SIZE_MB * 1024 * 1024;

  fileSizeError = false;
  
 
  s3client: AWSS3UploadAsh = new AWSS3UploadAsh(environment.config)


  constructor(private cdr: ChangeDetectorRef, private sendImage: AWSImageUploadService,private getsImage:AwsgetimageService,public dialog: MatDialog) {}

  ngOnInit(): void {}

  onChange(event: any) {

    this.imgselected = true
    if(this.imgsrc != ''){
      this.imgsrc =''
    }
    
    console.log("event",event);
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile);
    const reader = new FileReader();
    
    if (this.selectedFile && this.selectedFile.size > this.MAX_FILE_SIZE_BYTES) {
      this.fileSizeError = true;
      
    } 

    reader.onload = () => {
      this.imgsrc = reader.result as string;
    };
    console.log("imgs",this.imgsrc)
    reader.readAsDataURL(this.selectedFile);
  }

  onUpload( data : tagtitleservice) {

    const currentDate = new Date();
    this.currentDateTime = currentDate.toISOString();
    console.log("check");
    console.log(this.selectedFile);

    this.imgsrc = this.getsImage.getImageUrl('imggallery487','ImgGallery/'+this.selectedFile.name)
    

    //try errorfor s3 bucket
    this.sendImage.uploadFile(this.selectedFile,environment.config.bucketName).subscribe((percentage) =>{
      this.ProgressBar = percentage
      console.log("percent",percentage);
      
      
    },(error) => {
      console.error('Error uploading file:', error);
    },() => {
      const dialogRef =  this.dialog.open(ProgressDialogComponent, {
        width: '250px',
        data: {image:this.imgsrc,
          title:this.tagtitle.title,
          tag:this.tagtitle.tag},
      });
      console.log('File uploaded successfully!');
      // this.imgsrc = ""
      this.imgselected = false
    })

      //storing images in firebase 
      console.log("real data", data);
      
      set(ref(this.database, '/'+data.tag), {
        title:data.title,
        tag:data.tag,
        name: this.selectedFile.name,
        imgsrc : this.imgsrc
      });
      this.ProgressBar = null;
      this.tagtitle.tag = ""
      this.tagtitle.title = ""
      this.selectedFile=""
    
  }

}
//ImgGallery
