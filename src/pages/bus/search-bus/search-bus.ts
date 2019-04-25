/**
* @author    ThemesBuckets <themebucketbd@gmail.com>
* @copyright Copyright (c) 2018
* @license   Fulcrumy
* 
* This File Represent Search Page of Bus Component
* File path - '../../src/pages/bus/search-bus/search-bus'
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Search } from '../../../models/search';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';

@IonicPage()
@Component({
  selector: 'page-search-bus',
  templateUrl: 'search-bus.html',
})
export class SearchBusPage {

  searchObjects: Search = new Search();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.searchObjects.tripType = 'oneWay'; // Default Trip Type
  }

  /**
   * -------------------------------------------------------------
   * Origin Location
   * -------------------------------------------------------------
   * Open Location Search Page and Pick Origin Location
   */
  getLocationOrigin() {
    const modal = this.modalCtrl.create('LocationPage');
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.searchObjects.originLocationName = data.name;
        this.searchObjects.originLocationAlpha3Code = data.alpha3Code;
      }
    });
    modal.present();
  }

  /**
   * -------------------------------------------------------------
   * Destination Location
   * -------------------------------------------------------------
   * Open Location Search Page and Pick Destination Location
   */
  getLocationDestination() {
    const modal = this.modalCtrl.create('LocationPage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.searchObjects.destinationLocationname = data.name;
        this.searchObjects.destinationLocationAlpha3Code = data.alpha3Code;
      }
    });
    modal.present();
  }


  /**
   * -------------------------------------------------------------
   * Open Calendar and Pick Dates
   * -------------------------------------------------------------
   */
  openCalendar() {

    // Calendar Modal Config Options
    const options: CalendarModalOptions = {
      color: 'primary'
    };

    // Create Calendar Modal
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    // When Calendar Modal Dismiss
    myCalendar.onDidDismiss((date: any, type: string) => {
      if (date) {
        // Set departure Date
        this.searchObjects.departureDate = date.string;
      }
    })
  }

  /**
   * -------------------------------------------------------------
   * Find Bus
   * -------------------------------------------------------------
   */
  findBus() {
    const modal = this.modalCtrl.create('BusListPage');
    modal.present();
  }

}
