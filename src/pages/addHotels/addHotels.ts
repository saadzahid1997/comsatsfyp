import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Hotel } from '../../models/hotels/hotels.interface';
//import {google} from '@google/maps';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MapsAPILoader } from '@agm/core';
import { CameraOptions,Camera} from '@ionic-native/camera/ngx';
import firebase, { storage } from 'firebase';
import {Rooms} from '../../models/rooms/rooms.interface'
import { ViewController } from 'ionic-angular/navigation/view-controller';
//import { google } from '@agm/core/services/google-maps-types';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-addHotels',
  templateUrl: 'addHotels.html',
})
export default class AddHotelsPage implements OnInit {
  hotelLocationRef: string;
  myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  imageURI: any;
  imageFileName: any;
  hotel = {} as Hotel
  hotelRef$: AngularFirestoreCollection<any>
  ngZone: any;
  map: any;
  google:any;  
  roomRef:any;
  room = { } as Rooms;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public database: AngularFirestore, public alert: AlertController,
    public modal: ModalController, public MapsApiLoader:MapsAPILoader,public camera:Camera,
    public viewCtrl : ViewController
    
  ) {
    console.log("i am here")
    this.hotelRef$ = this.database.collection('hotel');
    this.myPhotosRef = firebase.storage().ref('/Hotel Photos/')  
    
    //console.log(this.viewCtrl.onDidDismiss());
    
  }
  ngOnInit(){
    this.MapsApiLoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtLocation').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
        types : ["geocode"]
      });
      autocomplete.setComponentRestrictions({ 'country': ['pk'] })
      autocomplete.addListener("place_changed", () => {
          let place = google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          this.hotel.hotelLocationLat = place.geometry.location.lat();
          this.hotel.hotelLocationLng = place.geometry.location.lng();
          this.hotel.hotelLocation = place.formatted_address;

          console.log(this.hotel.hotelLocation);               
      });
    });
  }
  // public options = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  showRadioCategory() {

    let alertCategory = this.alert.create();
    alertCategory.setTitle('Hotel Category');
    alertCategory.addInput({
      type: 'radio',
      label: '3 Star',
      value: '3 Star',
      checked: true

    });
    alertCategory.addInput({
      type: 'radio',
      label: '5 Star',
      value: '5 Star'
    });
    alertCategory.addInput({
      type: 'radio',
      label: '7 Star',
      value: '7 Star'
    });
    alertCategory.addInput({
      type: 'radio',
      label: 'Normal',
      value: 'Normal'
    });
    alertCategory.addButton('Cancel');
    alertCategory.addButton({
      text: 'OK',
      handler: data => {

        this.hotel.hotelCategory = data;
      }
    });
    alertCategory.present();

  }


  showHotelAmenities()
  {
    let alertHotelAmenities = this.alert.create();
    alertHotelAmenities.setTitle('Amenities');
    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Free Wifi',
      value: 'Free Wifi'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Free Parking',
      value: 'Free Parking'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Pool',
      value: 'Pool'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Air Condtioning',
      value: 'Air Condtioning'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Room Service',
      value: 'Room Service'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Meeting rooms' ,
      value: 'Meeting rooms'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Kitchenette' ,
      value: 'Kitchenette'
      
    });

    alertHotelAmenities.addInput({
      type : 'checkbox',
      label: 'Restaurant' ,
      value: 'Restaurant'
      
    });

    alertHotelAmenities.addButton('Cancel');
    alertHotelAmenities.addButton({
      text: 'OK',
      handler: data => {

        this.hotel.hotelAmenities = data;
      }
    });
    alertHotelAmenities.present();
  }

  hotelLocation()
  {
     this.ngOnInit(); 
      
     
  }
   
   roomsModal()
   {
      
       let roomModal = this.modal.create('HotelRoomsPage');
       roomModal.present();
       
   }
  
   
  
  addHotel() {
    console.log(this.navParams.get('rId'))
    this.hotelRef$.add({
      hotelName: this.hotel.hotelName,
      hotelCategory: this.hotel.hotelCategory,
      hotelOverview: this.hotel.hotelDescription,
      hotelMail: this.hotel.hotelMail,
      hotelContactNo: this.hotel.hotelContactNo,
      hotelLocationLat: this.hotel.hotelLocationLat,
      hotelLocationLng: this.hotel.hotelLocationLng,
      hotelLocation:this.hotel.hotelLocation,
      hotelAmenities:this.hotel.hotelAmenities,
      //hotelRoomsRef: this.roomRef
    });
  }

  //   }
  // // public uploadPhoto(): void {
  //   this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
  //     .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
  //     .then((savedPicture) => {
  //       this.myPhotoURL = savedPicture.downloadURL;
  //     });
  // }
  takePhoto() {
    const options : CameraOptions = {
      quality:50,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    console.log(this.camera.getPicture(options));
    //const result = this.camera.getPicture(options);
    console.log("in the takephtot")
    const img = 'data:image/jpeg;base64,${result}';
    const pictures = storage().ref('pictures');
    pictures.putString(img, 'data_url')
    // Camera.getPicture({
    //   quality: 100,
    //   destinationType: Camera.DestinationType.DATA_URL,
    //   sourceType: Camera.PictureSourceType.CAMERA,
    //   encodingType: Camera.EncodingType.PNG,
    //   saveToPhotoAlbum: true
    // }).then(imageData => {
    //   this.myPhoto = imageData;
    //   this.uploadPhoto();
    // }, error => {
    //   console.log("ERROR -> " + JSON.stringify(error));
    // });
  }  

  // choosePhoto()
  //  {
  //    console.log('In choose photo');
  //   Camera.getPicture({
  //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     quality: 100,
  //     encodingType: Camera.EncodingType.PNG,
    
  //   }).then(imageData => {
  //     this.myPhotosRef = imageData;
  //     this.uploadPhoto();
  //   }, error => {
  //     console.log("ERROR -> " + JSON.stringify(error));
  //   });
  // }

  // public uploadPhoto()
  // {   
  //     console.log("In uplaod Photo")
  //     this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
  //       .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
  //       .then((savedPicture) => {
  //         this.myPhotoURL = savedPicture.downloadURL;
  //       });
  //   }

  // private generateUUID(): any {
  //   var d = new Date().getTime();
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
  //     var r = (d + Math.random() * 16) % 16 | 0;
  //     d = Math.floor(d / 16);
  //     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }
}

