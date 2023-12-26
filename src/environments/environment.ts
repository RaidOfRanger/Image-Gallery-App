// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  config : {
    bucketName: 'imggallery487',
    dirName: 'ImgGallery',
    
    region: 'ap-south-1',
    accessKeyId: 'AKIA6PBVTUXM7DOGPLVT',
    secretAccessKey: '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',
    s3Url: 'https://imggallery487.s3.ap-south-1.amazonaws.com/'
  },
  firebaseConfig : {
    apiKey: "AIzaSyDIREs7YbUemg65yzD9hwJoYMM9SyxxlTE",
    authDomain: "imageapp-e4448.firebaseapp.com",
    projectId: "imageapp-e4448",
    storageBucket: "imageapp-e4448.appspot.com",
    messagingSenderId: "972784069643",
    appId: "1:972784069643:web:3e656720c22a3161b16b0e",
    measurementId: "G-0F336ER0Y1",
    databaseURL:"https://imageapp-e4448-default-rtdb.firebaseio.com/"
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
