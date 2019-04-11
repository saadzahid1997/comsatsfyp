

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  @ViewChild ('username')user;
  @ViewChild ('userpass')pass;
  

  signInForm: any;


  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private fire: AngularFireAuth,
    public alertCtrl:AlertController) {
    this.menuCtrl.enable(false); // Disable SideMenu
  }


  ngOnInit() {
    this.formValidation();
  }

  formValidation() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  alert(message : string)
    {
      this.alertCtrl.create({
        title:'Alert',
        subTitle:message,
        buttons:['OK']
      }).present();
    }
  doLogin() {
    this.fire.auth.signInWithEmailAndPassword(this.user.value,this.pass.value)
    .then(() =>{this.navCtrl.setRoot('HomePage');})
    .catch(error =>{this.alert(error.message)})
    console.log(this.user.value);
    console.log(this.pass.value);
  }

  goToForgetPasswordPage() {
    this.navCtrl.setRoot('ForgetPasswordPage');
  }

  goToSignUpPage() {
    this.navCtrl.setRoot('SignUpPage');
  }

  logInWithFacebook()
  {
    //this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    this.navCtrl.setRoot('HomePage');
  }
  
  logInWithGoogle()
  {
    //this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    this.navCtrl.setRoot('HomePage');
  }
  
  logInWithTwitter()
  {

  }
}
