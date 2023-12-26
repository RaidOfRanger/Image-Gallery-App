import { Component, HostListener, OnInit, inject } from '@angular/core';
import { AwsgetimageService } from 'src/app/service/awsgetimage.service';
import { ScrollService } from 'src/app/service/scroll.service'
import { FirestoreModule, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as AWS from 'aws-sdk'
import { Item, getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, get , child} from "firebase/database";

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
[x: string]: any;

  item$!: Observable<Item[]>;
  

  IsSearchSelected: boolean = false
  filteredImages: any[] = [];
  searchTerm: string = '';
  
  s3 = new AWS.S3()
  imageUrls?: (string| undefined)[] = []

  app = initializeApp(environment.firebaseConfig);
  analytics = getAnalytics(this.app);
  database = getDatabase(this.app);
  dbRef = ref(this.database);
  datalist: any[] = [];

  jsonData!: string[];

  constructor(private getsImage:AwsgetimageService,private scroll:ScrollService, private firestore: FirestoreModule) { }

  ngOnInit(): void {

    console.log("scroll works");

    this.IsSearchSelected = false
    //getting data from realtime db
    get(child(this.dbRef,'/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("data is here",snapshot.val());
        
        //console.log("converted list",this.datalist)
        
        this.datalist = Object.values(snapshot.val());
       // this.jsonData = JSON.parse(snapshot.toJSON)
        console.log('datalist ', this.datalist);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    
    //retriving image from s3bucket
    AWS.config.update({
      region:'ap-south-1',
      accessKeyId: 'AKIA6PBVTUXM7DOGPLVT',
      secretAccessKey: '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',
    });

    var bucket = (new AWS.S3({
      params: {
        Bucket:'imggallery487',
        dirName: 'ImgGallery',
      }
    }));
    const url = bucket.listObjectsV2((err,data) => {
      if(err){
        console.log(err);
        
      }else{
        console.log("data",data.Contents);
        const keys = data.Contents?.map((object) => object.Key);
        console.log('key',keys);
        this.imageUrls = keys?.map((k)=> {
          
          return this.getsImage.getImageUrl('imggallery487',k)}
      
        )
        console.log("urlll",this.imageUrls);
        
        
        // this.imageUrls = keys?.map((key) => this.getsImage.getImageUrl('imggallery487', key));
      }
    })
    console.log("url",url)
  }
  
  filterImages() {
    this.IsSearchSelected = true
    this.filteredImages = this.datalist.filter(image =>
      image.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log("filter ", this.filteredImages);
    
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Fetch more data when the user is near the bottom
    if (this.scroll.isNearBottom()) {
      this.ngOnInit();
    }
  }
}