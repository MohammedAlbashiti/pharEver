import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
@Component({
  selector: "page-add-place",
  templateUrl: "add-place.html"
})
export class AddPlacePage {
  type: any;
  name: any;
  phone: any;
  lat: any;
  lng: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.lat = navParams.get("lat");
    this.lng = navParams.get("lng");
    console.log(this.lat + "," + this.lng);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPlacePage");
  }

  beforeAdd() {
    if (this.name.length < 4) {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "The name should be more than 4 chars. ",
        buttons: ["OK"]
      });
      alert.present();
    } else if (!/^[0-9]+$/.test(this.phone)) {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "The phone number field, should only except numbers.",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.addPlace();
    }
  }

  addPlace() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();
    this.db.list("/place").push({
      name: this.name,
      phone: this.phone,
      type: this.type,
      lat: this.lat,
      lng: this.lng,
      date: Date.now()
    });
    loader.dismiss();
    const alert = this.alertCtrl.create({
      title: "Success",
      subTitle: "The place has been added successfuly",
      buttons: ["OK"]
    });
    alert.present();
    this.name = "";
    this.phone = "";
    this.type = "";
  }
}
