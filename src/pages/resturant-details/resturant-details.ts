import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResturantService } from '../../app/services/resturant.service';

/**
 * Generated class for the ResturantDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resturant-details',
  templateUrl: 'resturant-details.html',
})
export class ResturantDetailsPage implements OnInit {
  resturantList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public resSer:ResturantService) {
  }

  ngOnInit()
  {
    const resId = this.navParams.data.resId;
    this.resSer.showResDetails(resId).subscribe(res => {
      this.resturantList[0] = res.data;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantDetailsPage');
  }

}
