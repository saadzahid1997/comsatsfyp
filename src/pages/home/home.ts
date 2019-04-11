
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  goToSearchPage() {
    this.navCtrl.setRoot('SearchPage');
  }
}

