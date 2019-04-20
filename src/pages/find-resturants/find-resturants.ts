import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,Platform } from 'ionic-angular';
import { ResturantService } from '../../app/services/resturant.service';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

/**
 * Generated class for the FindResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-resturants',
  templateUrl: 'find-resturants.html',
})
export class FindResturantsPage implements OnInit {
  resturantList: any = [];
  map: any;
  geocoder: any;
  address: any;
  google:any;

  constructor(public navCtrl: NavController, 
               public navParams: NavParams,
               public resturantSer : ResturantService,
               public db : AngularFirestore,
               public popoverCtrl: PopoverController,
               public platform: Platform)
   {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindResturantsPage');
  }
  ngOnInit()
  {
    //   this.resturantSer.getResturant().subscribe(resturant=>{
    //   console.log(resturant);
    //   this.resturantList = resturant;
    // });
  }
  openTrips(myEvent, resturantId) {
    console.log(resturantId);
    let popover = this.popoverCtrl.create('TripPopResturantsPage', { resturantId });
    popover.present({
      ev: myEvent
    });
  }
}
