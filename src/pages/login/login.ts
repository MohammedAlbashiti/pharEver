import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";

import { HomePage } from "../home/home";
import { SignupPage } from "../signup/signup";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: string;
  pass: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then(
      user => {
        loader.dismiss();
        console.log(user);
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        loader.dismiss();
        console.error(error);
        const alert = this.alertCtrl.create({
          title: "Error",
          subTitle: error.message,
          buttons: ["OK"]
        });
        alert.present();
      }
    );
  }

  sign() {
    this.navCtrl.push(SignupPage);
  }
}
