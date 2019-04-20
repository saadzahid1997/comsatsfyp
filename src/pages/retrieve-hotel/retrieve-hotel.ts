import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HotelService } from '../../app/services/hotels.service';
import { Hotel } from '../../models/hotels/hotels.interface';
import { SearchHotelsPage } from '../../pages/hotel/search-hotels/search-hotels';
//import * as geofirex from 'geofirex';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { TripService } from '../../app/services/trips.service';
import { storage } from 'firebase';
//import { FirebaseApp } from '@firebase/app-types';
/**
 * Generated class for the RetrieveHotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retrieve-hotel',
  templateUrl: 'retrieve-hotel.html',
})
export class RetrieveHotelPage implements OnInit {


  hotels: Observable<any>;
  radius = new BehaviorSubject(0.5);
  hotelsList: any = [];
  retHotelList:any=[];
  hotel = {} as Hotel;
  i:any;
  x:any;
  hotelLat:any;
  hotelLng:any;
  // tripDetails = [];
  locationRef = SearchHotelsPage.searchPlace;
  searchLocationRef:string;
  hotelRef$: AngularFirestoreCollection<any>
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFirestore,
    private hotelSer: HotelService, public popoverCtrl: PopoverController, public tripSer: TripService) {
    this.hotelRef$ = this.db.collection('hotel');

  }

  ngOnInit() {
    // this.tripSer.getTripDetails().subscribe(trips => {
    //   console.log(trips);
    // })
    console.log("in thre retrieve page")
    console.log(" Latitude")
    console.log(this.navParams.data.searchLocationLat);
    this.hotelLat = this.navParams.data.searchLocationLat;
    console.log(" Longitude")
    this.hotelLng = this.navParams.data.searchLocationLng;
    this.hotelSer.getHotels().subscribe(items => {
      console.log(items);
      this.hotelsList = items;
      console.log(this.hotelsList);
      console.log(items.length);
      console.log("Hotel")
      this.x = 0;
      for(let i = 0; i< items.length ; i++ )
      {
        if(this.hotelsList[i].data.hotelLocationLat == this.hotelLat && this.hotelsList[i].data.hotelLocationLng == this.hotelLng )
        {
          console.log("in the for loop")

          this.retHotelList[this.x] = this.hotelsList[i];
          
          this.x = this.x + 1;  
        }
        
        else
        {
          console.log("not executing")
        }
      }
      console.log(this.retHotelList);
      this.hotelsList = this.retHotelList;
      
    }); 
    // //     const center = this.geo.point(40.5,-80.0);
    // //     const radius = 0.5;
    // //     const field = 'hotelLocation'
    // //     //this.geo.collection('hotel').within(center,radius,field);
    // //     this.hotels = this.radius.pipe(
    // //       switchMap( r => {
    // //         return this.geo.collection('hotel').within(center, r, field);
    // //      })
    // //     );
    // //   }  
    // //   update(v){
    //     this.radius.next(v);
  }
  ionViewDidLoad() {

  }
  /**
   * Open Notification Pop-over
   * @param myEvent
   */

  openTrips(myEvent, hotelId) {
    let popover = this.popoverCtrl.create('TripPopPage', { hotelId });
    popover.present({
      ev: myEvent
    });
  } 

  // retrieveData() {
  //   console.log("operating");
  //   //console.log(items[9]);
  //   //console.log(this.hotelsList);
  //   this.hotelSer.getItems().subscribe(items => {

  //     this.hotelsList = items;

  //     let hotels = [];


  //     this.hotelsList.forEach(hotel => {
  //       hotels.push(hotel);
  //       console.log(hotel);
  //     });

  //   });

  // }

  hotelDetail(hotelId) {
  
    this.navCtrl.setRoot('HotelDetailsPage', {hotelId});
  }

}

