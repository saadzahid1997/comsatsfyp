/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Details of Hotel Page Component
 * File path - '../../src/pages/hotel/hotel-details/hotel-details'
 */

import { Component, OnInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Hotel } from '../../../models/hotels/hotels.interface';
//import { HotelService } from '../../../app/services/hotels.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { HotelService } from '../../../app/services/hotels.service';
import { storage } from 'firebase';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-hotel-details',
  templateUrl: 'hotel-details.html',
})
export class HotelDetailsPage implements OnInit {
  hotels: Observable<any>;
  hotelsList: any = [];
  hotelDetail;
  hotel = {} as Hotel;
  hotelId: string;
  //locationRef = SearchHotelsPage.searchPlace;
  hotelRef$: AngularFirestoreCollection<any>

  // Check In Date
  checkInDate: any;

  // Check Out Date
  checkOutDate: any;

  // Array List of Hotels
  //hotels: any = [];
  //hotelDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private db: AngularFirestore,
    public hotelSer: HotelService
  ) {
    // Get Hotel Details Information
    this.hotelRef$ = this.db.collection('hotel');
    // Current Time For CheckIn (Demo)
    this.checkInDate = new Date();
    // Add 5 days more for Check Out time
    this.checkOutDate = new Date().setTime(new Date().getTime() - (24 * 60 * 60 * 1000) * 5);

    //this.getHotelList();
  }

  ngOnInit() {
      
  
    
    const hotelId = this.navParams.data.hotelId;
    this.hotelSer.showHotelDetails(hotelId).subscribe(hotel => {
      this.hotelsList[0] = hotel.data;
      console.log(this.hotelsList );
    })

  }
  /**
   * Open Location Map
   */
  openLocationMap()
    {
      this.modalCtrl.create('LocationMapPage', { address: this.hotel.hotelLocationLat  }).present();
    }

  goToOrderPage() {
    this.viewCtrl.dismiss();
    //this.navCtrl.setRoot('OrderHotelPage', { hotelDetails: this.hotelDetails });
  }

  /**
   * -----------------------------------------------------------
   * Get List of Hotels
   * -----------------------------------------------------------
   * From Data Provider Service Call `getHotels` method that Give You List of Hotel
   * 
   * You get `DataProvider` Service at - 'src/providers/data/data';
   */
  getHotelList() {
    //this.hotels = this.dataProvider.getHotels();
  }


}