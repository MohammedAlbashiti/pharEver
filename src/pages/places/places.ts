import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EditPlacePage } from "../edit-place/edit-place";
@Component({
  selector: "page-places",
  templateUrl: "places.html"
})
export class PlacesPage {
  messagesRef: AngularFireList<any>;
  messages: Observable<any[]>;
  places: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {
    this.messagesRef = db.list("/place");
    // Use snapshotChanges().map() to store the key
    this.messages = this.messagesRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    this.messages.subscribe(data => {
      console.log("data = ");
      console.log(data);
      this.places = data;
      console.log("sorted");

      //let min = data[0].name;
      for (let i = 0; i < this.places.length - 1; i++) {
        for (let j = i + 1; j < this.places.length; j++) {
          if (this.places[i].name > this.places[j].name) {
            let temp = this.places[i];
            this.places[i] = this.places[j];
            this.places[j] = temp;
          }
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PlacesPage");
  }
  editPlace(key, type, name, lat, lng, phone) {
    this.navCtrl.push(EditPlacePage, {
      key: key,
      name: name,
      type: type,
      lat: lat,
      lng: lng,
      phone: phone
    });
  }
}
