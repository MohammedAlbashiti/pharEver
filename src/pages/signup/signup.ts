import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
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
    console.log("ionViewDidLoad SignupPage");
  }

  sign() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(
      user => {
        loader.dismiss();
        console.log(user);
        const alert = this.alertCtrl.create({
          title: "Register finish",
          subTitle: "Go back to login page to use your cradentials",
          buttons: ["OK"]
        });
        alert.present();
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
}
