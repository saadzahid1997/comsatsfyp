import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {Resturant} from '../../models/resturants/resturants.interface';
import { MapsAPILoader } from '@agm/core';
import { Place } from '../../models/places/places.interface';
//import { google } from '@agm/core/services/google-maps-types';
declare var google: any;

/**
 * Generated class for the AddPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-places',
  templateUrl: 'add-places.html',
})
export class AddPlacesPage {

  placeRef$ : AngularFirestoreCollection<any>;
  place = {} as Place;
  google:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert : AlertController, public db:AngularFirestore, public MapsApiLoader: MapsAPILoader) {
    this.placeRef$ = this.db.collection('places');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AadResturantsPage');
  } 
  
  placeLocation()
  {
    this.MapsApiLoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtLocation').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
        types : ["geocode"]
      });
      autocomplete.setComponentRestrictions({ 'country': ['pk'] })
      autocomplete.addListener("place_changed", () => {
          let place = google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          this.place.placeLocationLat = place.geometry.location.lat();
          this.place.placeLocationLng = place.geometry.location.lng();
          this.place.placeLocation = place.formatted_address;
          //console.log(this.resturant.resturantLocation);               
      });
    });
  }
  addPlaces()
  { 
    this.placeRef$.add({
      placeName : this.place.placeName,
      placeLocation : this.place.placeLocation,
      placeLocationLat: this.place.placeLocationLat,
      placeLocationLng: this.place.placeLocationLng,
      placeDescription : this.place.placeDescription
    });
  }
}
