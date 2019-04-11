import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../app/services/trips.service';

/**
 * Generated class for the CreateTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html',
})
export class CreateTripPage implements OnInit {
  tripForm: FormGroup;
  tripList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public _formBuilder: FormBuilder, private tripSer: TripService) {
    this.menuCtrl.enable(true)
  }

  ngOnInit() {
    this.tripSer.getTripDetails().subscribe(items => {
      this.tripList = items;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTripPage');
    this.tripForm = this._formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    })
  }
  trip() {
    this.navCtrl.push("TripsPage");
    console.log("Clicked");
  }
}
