/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Details of Hotel Page Component
 * File path - '../../src/pages/hotel/hotel-details/hotel-details'
 */

import { Component, OnInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { Hotel } from '../../../models/hotels/hotels.interface';
import { Review } from '../../../models/reviews/reviews.interface';
//import { HotelService } from '../../../app/services/hotels.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { HotelService } from '../../../app/services/hotels.service';
import { storage } from 'firebase';
import { Observable } from 'rxjs';
import { hotelReviewService } from '../../../app/services/hotelReview.service';

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
  reviews = {} as Review;
  reviewList:any = [];
  hotelReviewList:any= [];
  //locationRef = SearchHotelsPage.searchPlace;
  hotelRef$: any
  reviewRef$:AngularFirestoreCollection<any>
  // Check In Date
  checkInDate: any;

  // Check Out Date
  checkOutDate: any;
  x: number;
  reviewDate = Date.now();
  
  //review: any;

  // Array List of Hotels
  //hotels: any = [];
  //hotelDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private db: AngularFirestore,
    public hotelSer: HotelService,
    public alert: AlertController,
    public reviewSer:hotelReviewService
  ) {
    // Get Hotel Details Information
    
   
    this.reviewRef$ = this.db.collection('hotel-Reviews')
    // Current Time For CheckIn (Demo)
    this.checkInDate = new Date();
    // Add 5 days more for Check Out time
    this.checkOutDate = new Date().setTime(new Date().getTime() - (24 * 60 * 60 * 1000) * 5);
    this.hotelId = this.navParams.data.hotelId;
    //this.getHotelList();
  }

  ngOnInit()
   {     
    
    this.hotelRef$ = this.db.collection('hotel').doc(this.hotelId);
    this.hotelSer.showHotelDetails(this.hotelId).subscribe(hotel => {
      this.hotelsList[0] = hotel.data;
       console.log(this.hotelsList );
    })

    this.reviewSer.getReviewDetails().subscribe(items =>{
        this.reviewList = items;
        this.x = 0;
        for(let i=0 ; i<items.length ; i++)
        {
          if(this.reviewList[i].data.hotelId == this.hotelId)
          {
              this.hotelReviewList[this.x] = this.reviewList[i];
              this.x = this.x + 1;
          }
          else
          {
            console.log("no reviews")
          }
      }
      console.log(this.hotelReviewList);
      this.reviewList = this.hotelReviewList;
        
    });
  }
  /**
   * Open Location Map
   */
  openLocationMap()
    {
      
      this.modalCtrl.create('LocationMapPage', { Latitude: this.hotelsList[0].hotelLocationLat, Longitude: this.hotelsList[0].hotelLocationLng, Address:this.hotelsList[0].hotelLocation}).present();
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
  addReview()
  {
       
      
      this.reviewRef$.add({
        hotelId: this.reviews.hotelId = this.hotelId ,
        hotelReview : this.reviews.hotelReview
      })
         
  }

}