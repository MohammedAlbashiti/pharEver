import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
@Component({
  selector: "page-edit-place",
  templateUrl: "edit-place.html"
})
export class EditPlacePage {
  place = {
    key: "",
    name: "",
    type: "",
    lat: "",
    lng: "",
    phone: ""
  };
  item: AngularFireList<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController
  ) {
    this.place.key = navParams.get("key");
    this.place.name = navParams.get("name");
    this.place.type = navParams.get("type");
    this.place.lat = navParams.get("lat");
    this.place.lng = navParams.get("lng");
    this.place.phone = navParams.get("phone");
    this.item = this.db.list("/place");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditPlacePage");
  }
  beforeUpdate() {
    if (this.place.name.length < 4) {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "The name should be more than 4 chars. ",
        buttons: ["OK"]
      });
      alert.present();
    } else if (!/^[0-9]+$/.test(this.place.phone)) {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "The phone number field, should only except numbers.",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.updatePlace();
    }
  }
  updatePlace() {
    this.item
      .update(this.place.key, {
        name: this.place.name,
        type: this.place.type,
        lat: this.place.lat,
        lng: this.place.lng,
        phone: this.place.phone
      })
      .then(
        data => {
          console.log(data);
          let alert = this.alertCtrl.create({
            title: "Success",
            subTitle: "Your Place is updated",
            buttons: ["OK"]
          });
          alert.present();
        },
        error => {
          console.error(error);
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: error.message,
            buttons: ["OK"]
          });
          alert.present();
        }
      );
  }
}
