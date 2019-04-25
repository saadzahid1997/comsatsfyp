/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Bus Details Component
 * File path - '../../src/pages/bus/bus-details/bus-details'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bus-details',
  templateUrl: 'bus-details.html',
})
export class BusDetailsPage {

  departureDate: any;
  totalSeats: number = 4;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    this.departureDate = new Date();
  }

  // Open Checkout Page
  goToCheckoutPage() {
    this.navCtrl.setRoot('CheckoutPage');
  }
}
