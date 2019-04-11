import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Trip } from '../../models/trips/trips.interface';

/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  trip = {} as Trip;
  
  tripRef$:AngularFirestoreCollection<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFirestore, //private tripSer:TripService
    ) {

    this.tripRef$ = this.db.collection('trips')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsPage');
  }
  addTrips()
  {
    this.tripRef$.add({
      tripName : this.trip.tripName,
      tripLocation: this.trip.tripLocation,
      tripHost : this.trip.tripHost
    });
  }

}
