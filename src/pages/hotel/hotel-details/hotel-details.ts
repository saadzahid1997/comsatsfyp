/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Details of Hotel Page Component
 * File path - '../../src/pages/hotel/hotel-details/hotel-details'
 */

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Hotel } from '../../../models/hotels/hotels.interface';
//import { HotelService } from '../../../app/services/hotels.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
@IonicPage()
@Component({
  selector: 'page-hotel-details',
  templateUrl: 'hotel-details.html',
})
export class HotelDetailsPage implements OnInit {
  hotelsList: any = [];
  hotel = {} as Hotel;
  //locationRef = SearchHotelsPage.searchPlace;
  hotelRef$: AngularFirestoreCollection<Hotel[]>

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
   //private hotelSer: HotelService
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
    // this.hotelSer.getHotels().subscribe(items => {
    //   this.hotelsList = items;
    // });
  }

  /**
   * Open Location Map
   */
  openLocationMap() {
    this.modalCtrl.create('LocationMapPage', { address: this.hotel.hotelLocation }).present();
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