import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {Resturant} from '../../models/resturants/resturants.interface';

/**
 * Generated class for the AadResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aad-resturants',
  templateUrl: 'aad-resturants.html',
})
export class AadResturantsPage {
  resturnatRef$ : AngularFirestoreCollection<any>;
  resturant = {} as Resturant;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert : AlertController, public db:AngularFirestore) {
    this.resturnatRef$ = this.db.collection('resturants');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AadResturantsPage');
  } 
  resturantMeals()
  {
     let alertResturantMeals = this.alert.create();
     alertResturantMeals.setTitle('Meals');
     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Breakfast',
      value: 'Breakfast'
     });
     
     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Brunch',
      value: 'Brunch'
     });

     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Lunch',
      value: 'Lunch'
     });

     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Dinner',
      value: 'Dinner'
     });

     alertResturantMeals.addButton('Cancel');
    alertResturantMeals.addButton({
      text: 'OK',
      handler: data => {

        this.resturant.resturantMeals = data;
      }
    });
    alertResturantMeals.present();
  }

  resturantCuisines()
  {
    let alertResturantCuisines = this.alert.create();
     alertResturantCuisines.setTitle('Meals');
     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Asian',
      value: 'Asian'
     });
     
     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Pakistani',
      value: 'Pakistani'
     });

     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Vegetarian',
      value: 'Vegetarian'
     });

     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Non Vegetarian',
      value: 'Non Vegetarian'
     });

     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Halal',
      value: 'Halal'
     });

     alertResturantCuisines.addButton('Cancel');
    alertResturantCuisines.addButton({
      text: 'OK',
      handler: data => {

        this.resturant.resturantCuisines = data;
      }
    });
    alertResturantCuisines.present();    
  }
  
  addResturant()
  { 
    this.resturnatRef$.add({
      resturantName : this.resturant.resturantName,
      resturantLocation : this.resturant.resturantLocation,
      resturantCuisines: this.resturant.resturantCuisines,
      resturantMeals : this.resturant.resturantMeals,
      resturantMail : this.resturant.resturantMail,
      resturantContact : this.resturant.resturantContact,
      resturantDescription : this.resturant.resturantDescription
    });
  }
}
