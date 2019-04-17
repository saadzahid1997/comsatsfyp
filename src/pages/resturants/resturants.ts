import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

/**
 * Generated class for the ResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resturants',
  templateUrl: 'resturants.html',
})
export class ResturantsPage {
  searchResturantForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _formBuilder:FormBuilder) {
    this.searchResturantForm = this._formBuilder.group({
      txtSearch: ['', Validators.required]
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantsPage');
  }
  addResturants()
  {
    this.navCtrl.setRoot('AadResturantsPage');
  }
  searchResturants()
  {
    this.navCtrl.setRoot('FindResturantsPage')
  }
}
