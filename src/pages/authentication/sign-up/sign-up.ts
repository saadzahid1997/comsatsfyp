

import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore'
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  @ViewChild ('username')user;
  @ViewChild ('userpass')pass;
  
  registrationForm: any;

  // user  =  {} as User;
  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userRef$: AngularFirestoreCollection<any>
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private fire: AngularFireAuth,
    public alertCtrl:AlertController,
    private database:AngularFirestore) {
    this.menuCtrl.enable(false); // Disable SideMenu
    this.userRef$ = this.database.collection('users');  
  }
  
  
  ngOnInit() {
    this.formValidation();
  }

  alert(message : string)
    {
      this.alertCtrl.create({
        title : 'Alert',
        subTitle : message,
        buttons: ['OK']
      }).present();
    }
  formValidation() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doRegistration() {
  
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.pass.value)
      .then(() =>{
        this.navCtrl.setRoot('HomePage');    
      })
      .catch(error =>{
        this.alert(error.message);
      })      

    
      

  }

  
  
  userLocation()
    {
      // this.mapsApiLoader.load().then(() => {
      //   let nativeHomeInputBox = document.getElementById('userAddress').getElementsByTagName('input')[0];
      //   let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
      //     types: ["geocode"]
      //   });
      //   //aautocomplete.setComponentRestrictions({ 'country': ['pk'] })
      //   autocomplete.addListener("place_changed", () => {
      //     this.ngZone.run(() => {
           
      //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //       this.user.userLocation = place.formatted_address;
      //       //this.hotelLocationRef = place.formatted_address;
            
  
      //     });
      //   });
      // });
    }
    
    addUser()
    {
      this.userRef$.add({
        userFirstName:this.user.userFirstName,
        userLastName:this.user.userLastName,
        userMail:this.user.userMail,
        userPass:this.user.userPass,
        userAddress:this.user.userLocation
      });
    }

  //   ionViewDidLoad(value) {
  //     // console.log("I'm here in ioncViewLoad");
  //      //console.log(value);
  //      //console.log(this.hotel);
   
  //      this.mapsAPILoader.load().then(() => {
  //        let nativeHomeInputBox = document.getElementById('userAddress').getElementsByTagName('input')[0];
  //        let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
  //          types: ["geocode"]
  //        });
  //        autocomplete.setComponentRestrictions({ 'country': ['pk'] })
  //        autocomplete.addListener("place_changed", () => {
  //          this.ngZone.run(() => {
            
  //            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  // //           this.hotel.hotelLocation = place.formatted_address;
  //   //         this.hotelLocationRef = place.formatted_address;
             
   
  //          });
  //        });
  //      });
  //    }
       
  goToLoginPage() {
    this.navCtrl.setRoot('SignInPage');
  }
}
