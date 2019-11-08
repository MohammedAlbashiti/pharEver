import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { LoginPage } from "../login/login";
import { PlacesPage } from "../places/places";
import { EditPlacePage } from "../edit-place/edit-place";
import { AddPlacePage } from "../add-place/add-place";
import { AboutPage } from "../about/about";

declare let google;
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  messagesRef: AngularFireList<any>;
  messages: Observable<any[]>;
  places: any = [];

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private geolocation: Geolocation,
    public db: AngularFireDatabase
  ) {
    afAuth.auth.onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot(LoginPage);
      }
    });
  }
  ionViewDidLoad() {
    this.messagesRef = this.db.list("/place");
    // Use snapshotChanges().map() to store the key
    this.messages = this.messagesRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    this.messages.subscribe(data => {
      console.log("places = ");
      this.places = data;
      console.log(this.places);
      console.log("places length = " + this.places.length);
      this.loadMap();
      //this.addMarker(this.places);
    });
    setTimeout(() => {}, 3000);
  }

  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        var latlong = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        var options = {
          center: latlong,
          zoom: 3,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);

        for (let i = 0; i < this.places.length; i++) {
          var latlng = new google.maps.LatLng(
            this.places[i].lat,
            this.places[i].lng
          );
          
          let icon = "home.png";
          if (this.places[i].type == "r") {
            icon = "res.png";
          } else if (this.places[i].type == "p") {
            icon = "park.png";
          }
          this.viewMarker(
            latlng,
            this.places[i].name,
            this.places[i].key,
            this.places[i].type,
            this.places[i].lat,
            this.places[i].lng,
            this.places[i].phone,
            icon
          );
        }
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
  viewMarker(loc, label, key, type, lat, lng, phone, icon) {
    var ico = {
      url: "../../assets/imgs/" + icon, // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
      position: loc,
      map: this.map,
      label: label,
      icon: ico
    });
    this.addInfoWindow(marker, label, key, type, lat, lng, phone);
  }

  addInfoWindow(marker, label, key, type, lat, lng, phone) {
    google.maps.event.addListener(marker, "click", () => {
      this.navCtrl.push(EditPlacePage, {
        key: key,
        name: label,
        type: type,
        lat: lat,
        lng: lng,
        phone: phone
      });
    });
  }

  newMarker() {
    console.log("new marker");
    var marker = new google.maps.Marker({
      position: this.map.getCenter(),
      animation: google.maps.Animation.DROP,
      draggable: true,
      map: this.map
    });
    this.addNewMaker(marker);
  }

  addNewMaker(marker) {
    google.maps.event.addListener(marker, "dragend", function() {
      this.markerlatlong = marker.getPosition();

      console.log("latlong   " + this.markerlatlong);
      console.log("lat    " + marker.getPosition().lat());
      console.log("long   " + marker.getPosition().lng());
    });
    google.maps.event.addListener(marker, "click", () => {
      this.navCtrl.push(AddPlacePage, {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      });
    });
  }

  listPlaces() {
    this.navCtrl.push(PlacesPage);
  }
  aboutApp() {
    this.navCtrl.push(AboutPage);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
