import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform } from 'ionic-angular';
import { PlacesService } from '../../app/services/places.service';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the FindPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-places',
  templateUrl: 'find-places.html',
})
export class FindPlacesPage implements OnInit{

  placesList: any = [];
  map: any;
  geocoder: any;
  address: any;
  google:any;
  placesLat: any;
  placesLng: any;
  retPlacesList: any = [];
  x: number;

  constructor(public navCtrl: NavController, 
               public navParams: NavParams,
               public placeSer : PlacesService,
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
      this.placesLat = this.navParams.data.searchPlaceLat;
      this.placesLng = this.navParams.data.searchPlaceLng;
      this.placeSer.getPlaces().subscribe(place=>{
      console.log(place);
      this.placesList = place;
      this.x = 0;  
      //console.log(this.resturantList[2].data.resturantLocationLat);
      for(let i = 0; i< place.length ; i++ )
      {
        if(this.placesList[i].data.placeLocationLat == this.placesLat && this.placesList[i].data.placeLocationLng == this.placesLng )
        {
          console.log("in the for loop")

          this.retPlacesList[this.x] = this.placesList[i];
          
          this.x = this.x + 1;  
        }
        
        else
        {
          console.log("not executing")
        }
      }
      //console.log(this.retHotelList);
      this.placesList = this.retPlacesList

    });
  }
  openTrips(myEvent, placeId) {
    console.log(placeId);
    let popover = this.popoverCtrl.create('TripPopPlacesPage', { placeId });
    popover.present({
      ev: myEvent
    });
  }
  placeDetail(placeId)
  {
    this.navCtrl.setRoot('ResturantDetailsPage',{placeId});
  }

}
