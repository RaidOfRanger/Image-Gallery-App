import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { UploadComponent } from './Component/upload/upload.component';
import { GalleryComponent } from './Component/gallery/gallery.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { FormsModule , ReactiveFormsModule } from '@angular/forms'; 
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';

//firebase
// import { Angula } from '@angular/fire';
import { FirestoreModule, collectionData } from '@angular/fire/firestore';
import { ProgressDialogComponent } from './Component/progress-dialog/progress-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    GalleryComponent,
    ProgressDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
   FirestoreModule,
   MatDialogModule,
   MatProgressBarModule
   
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
