/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent List of Bus Component
 * File path - '../../src/pages/bus/bus-list/bus-list'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-bus-list',
  templateUrl: 'bus-list.html',
})
export class BusListPage {

  // Array List of Bus
  buses: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public dataProvider: DataProvider) {
    this.getBusList();
  }

  /**
   * -----------------------------------------------------------
   * Get List of Buses
   * -----------------------------------------------------------
   * From Data Provider Service Call `getBusList` method that Give You List of Bus
   * 
   * You get `DataProvider` Service at - 'src/providers/data/data';
   */
  getBusList() {
    this.buses = this.dataProvider.getBusList();
  }

  /**
   * Open Details Page of Selected Bus
   */
  goToViewDetailsPage() {
    this.dismiss();
    this.modalCtrl.create('BusDetailsPage').present();
  }

  /**
   * Dismiss function
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

