import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';

/**
 * Generated class for the TripDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})
export class TripDetailsPage implements OnInit {
  tripList : any = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripSer : TripService) {
  }
  ngOnInit()
  { 
      (this.navParams.data.tripDetailId);
      this.tripSer.tripDetails(this.navParams.data.tripDetailId).subscribe(item =>{
        console.log(item);
        this.tripList[0] = item.data;
        console.log(this.tripList);
      })
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailsPage');
  }

}
