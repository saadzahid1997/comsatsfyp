

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../../app/services/user.service';
//import { HotelDetailsPage}from '../../hotel/hotel-details/hotel-details';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  @ViewChild ('username')user;
  @ViewChild ('userpass')pass;
  userList:any=[];
  userSessionList:any=[];
  signInForm: any;
  userSessionName:any;
  uFName:any;

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  x: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private fire: AngularFireAuth,
    public alertCtrl:AlertController,
    public userSer:UserService) {
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
  doLogin(userName) {
    this.fire.auth.signInWithEmailAndPassword(this.user.value,this.pass.value).then(() =>{
       this.userSer.getHotels().subscribe(user =>{
        this.userList = user;
        console.log(this.userList);
        this.x = 0;
        for(let i = 0; i<user.length ;i++)
        {
          if(this.userList[i].data.userMail == this.user.value)
          {
            this.userSessionList[this.x]  = this.userList[i];
              this.x = this.x + 1;
            
          }
        }
        this.userList = this.userSessionList;
        console.log(this.userList);
        this.userSessionName = this.userList[0].data.userFName;
        console.log(this.userSessionName);
        userName = this.userSessionName;
        this.userSer.setUserData(userName);
        this.navCtrl.setRoot('HomePage')
      })
       
       
        
     })
    .catch(error =>{this.alert(error.message)})
    console.log(this.user.value);
    console.log(this.pass.value);
    //userName = this.user.value
    
    //this.navCtrl.push('MyApp',{userName})
    console.log("In the sign in page");
    console.log(userName);
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
