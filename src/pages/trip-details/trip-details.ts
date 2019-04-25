import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';
import { HotelService } from '../../app/services/hotels.service';
import { ResturantService } from '../../app/services/resturant.service';
import {PlacesService} from '../../app/services/places.service';
import { HotelDetailsPage } from '../hotel/hotel-details/hotel-details';
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
  hotelList: any = []
  hotelId: any= []
  resId: any= [];
  resList: any =[];
  placeId: any= [];
  placeList: any =[];
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripSer : TripService , public hotelSer:HotelService, public resSer:ResturantService, public placeSer:PlacesService) {
  }
  ngOnInit()
  { 
      (this.navParams.data.tripDetailId);
      this.tripSer.tripDetails(this.navParams.data.tripDetailId).subscribe(item =>{
        console.log(item);
        this.tripList[0] = item.data;
        console.log(this.tripList);
        var hotelLength = this.tripList[0].hotels.length;
        console.log(hotelLength);
       for(let i = 0 ; i < hotelLength; i++)
        {
          console.log(this.tripList[0].hotels[i]);

          this.hotelId[i] = this.tripList[0].hotels[i];
        }   
        console.log(this.hotelId);
        
        for(let x = 0; x < this.hotelId.length;x++)
        { 
          this.hotelSer.showHotelDetails(this.hotelId[x]).subscribe(hotel =>{
            console.log(hotel);
            this.hotelList[x] = hotel.data;
          })
        }
        console.log(this.hotelList);  
        
        var resLength = this.tripList[0].resturants.length;
        console.log(resLength);
       for(let i = 0 ; i < resLength; i++)
        {
          console.log(this.tripList[0].resturants[i]);

          this.resId[i] = this.tripList[0].resturants[i];
        }   
        console.log(this.hotelId);
        for(let x = 0; x < this.resId.length;x++)
        { 
          this.resSer.showResDetails(this.resId[x]).subscribe(resturant =>{
            //console.log(hotel);
            this.resList[x] = resturant.data;
          })
        }

        var placeLength = this.tripList[0].places.length;
        console.log(placeLength);
       for(let i = 0 ; i < placeLength; i++)
        {
          console.log(this.tripList[0].places[i]);

          this.placeId[i] = this.tripList[0].places[i];
        }   
        console.log(this.hotelId);
        for(let x = 0; x < this.placeId.length;x++)
        { 
          this.placeSer.showPlacesDetails(this.placeId[x]).subscribe(place =>{
            //console.log(hotel);
            this.placeList[x] = place.data;
          })
        }

      })
  
  }

  hotelDetail(hotelId){
    hotelId = this.hotelId;
    console.log(hotelId);
    this.navCtrl.setRoot('HotelDetailsPage', {hotelId});
    }

  resturantDetail(resId){
      resId = this.resId;
      this.navCtrl.setRoot('ResturantDetailsPage', {resId});
      }
      
  placeDetail(placeId){
        this.navCtrl.setRoot('PlaceDetailsPage', {placeId});
        }  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailsPage');
  }

}
