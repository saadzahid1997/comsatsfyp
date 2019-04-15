
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Search } from '../../../models/search';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
//import { Hotel } from '../../../models/hotels/hotels.interface';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { google} from '@google/maps';




@IonicPage()
@Component({
  selector: 'page-search-hotels',
  templateUrl: 'search-hotels.html',
})
export class SearchHotelsPage {

  searcHotelForm: FormGroup;
public static  searchPlace:string;
  locationRef:string;
  google:any;
  //hotelRef$: AngularFirestoreCollection<Hotel[]>
  @ViewChild("addHotels")
  @ViewChild("search")
  public searchElementRef;

  searchObjects: Search = new Search();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public _formBuilder: FormBuilder,
    //private database: AngularFirestore
    ) {
      
    this.searcHotelForm = this._formBuilder.group({
      txtSearch: ['', Validators.required]  

    })
    
  }

  openCalendar() {


    const options: CalendarModalOptions = {
      pickMode: 'range',
      color: 'primary'
    };


    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();


    myCalendar.onDidDismiss((date: any) => {
      if (date) {

        this.searchObjects.departureDate = date.from.string;

        this.searchObjects.returnDate = date.to.string;
      }
    })
  }


  ionViewDidLoad() {
  

    // this.mapsAPILoader.load().then(() => {
    //   let nativeHomeInputBox = document.getElementById('txtSearch').getElementsByTagName('input')[0];
    //   let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
    //     types: ["geocode"]
    //   });
    //   autocomplete.setComponentRestrictions({ 'country': ['pk'] })
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       SearchHotelsPage.searchPlace = place.formatted_address;
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //     });
    //   });
    // });
  }
  
  findHotels() {
  
    const modal = this.modalCtrl.create('HotelListPage');
    modal.present();
    
      console.log(SearchHotelsPage.searchPlace);
      console.log(this.locationRef);
        
    
  }
  addHotels() {
    this.navCtrl.setRoot("AddHotelsPage");
  }
  searchHotels()
  {
    this.navCtrl.setRoot("RetrieveHotelPage");
  }
  
}







