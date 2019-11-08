import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { Geolocation } from "@ionic-native/geolocation";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { PlacesPage } from "../pages/places/places";
import { AddPlacePage } from "../pages/add-place/add-place";
import { EditPlacePage } from "../pages/edit-place/edit-place";
import { AboutPage } from "../pages/about/about";

export const firebaseConfig = {
  apiKey: "AIzaSyA62RiYwZcFBdRROfN3d6yWhn3LqvkwEu0",
  authDomain: "pharever-d8277.firebaseapp.com",
  databaseURL: "https://pharever-d8277.firebaseio.com",
  projectId: "pharever-d8277",
  storageBucket: "pharever-d8277.appspot.com",
  messagingSenderId: "275344885835",
  appId: "1:275344885835:web:b19fbe1071baf0b185a5ce",
  measurementId: "G-4QXJ67JM30"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PlacesPage,
    AddPlacePage,
    EditPlacePage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PlacesPage,
    AddPlacePage,
    EditPlacePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
