/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Landing Page Component
 * File path - '../../src/pages/landing/landing'
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  @ViewChild('slider') slider: Slides;
  slideIndex = 0;

  // Slider Data
  slides = [
    {
      text: 'Visit the best place on your demand',
      imageUrl: 'assets/imgs/background/img2.jpeg',
    }
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false); // Disable SideMenu
  }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
  }

  /**
   * -------------------------------------------------------------
   * Go to Home Page
   * -------------------------------------------------------------
   */
  goToHomePage() {
    this.navCtrl.setRoot('HomePage');
  }

  /**
   * -------------------------------------------------------------
   * Go to Sign In Page
   * -------------------------------------------------------------
   */
  goToSignInPage() {
    this.navCtrl.setRoot('SignInPage');
  }

  /**
   * -------------------------------------------------------------
   * Go to Sign Up Page
   * -------------------------------------------------------------
   */
  goToSignUpPage() {
    this.navCtrl.setRoot('SignUpPage');
  }
}

