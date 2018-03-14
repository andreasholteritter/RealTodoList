import { Component }              from '@angular/core';
import { FormBuilder }            from '@angular/forms';
import { FormGroup }              from '@angular/forms';
import { Validators }             from '@angular/forms';
import { IonicPage }              from 'ionic-angular';
import { NavParams }              from 'ionic-angular';
import { NavController }          from 'ionic-angular';
import { AlertController }        from 'ionic-angular';
import {AngularFirestore}         from "angularfire2/firestore";

@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {

  public user = {
    username: null,
    password: null
  } as User;

  authForm: FormGroup;

  constructor(
    public navCtrl    :   NavController,
    public navParams  :   NavParams,
    private af        :   AngularFirestore,
    private alertCtrl :   AlertController,
    public fb         :   FormBuilder
  ) {
    this.authForm = fb.group({
      'username' : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      'password' : ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }


  transformUsername(value: string) {
    let email = "@email.com";
    return value + email;
  }

  //TODO make the input safe
  loginUser() {
    if (!(this.user.username == null) && !(this.user.password == null)) {
      if ((this.user.username.length > 4) && (this.user.password.length > 7)) {
        this.af.app.auth()
          .signInWithEmailAndPassword(this.transformUsername(this.user.username), this.user.password)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            this.presentAlert();
            console.log(error);
          });
      } else {
        this.presentAlert();
      }
    } else {
      this.presentAlert();
    }
  }

  //TODO make the input safe
  registerUser() {
    if (!(this.user.username == null) && !(this.user.password == null)) {
      if ((this.user.username.length > 4) && (this.user.password.length > 7)) {
        this.af.app.auth()
          .createUserWithEmailAndPassword(this.transformUsername(this.user.username), this.user.password)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            this.presentAlert();
            console.log(error);
          });
      } else {
        console.log("username length: " + this.user.username.length);
        console.log("password length: " + this.user.password.length);
        this.presentAlert();
      }
    } else {
      this.presentAlert();
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'There was a problem with your request',
      subTitle: 'There was an error with your username/password combination. Please try again.',
      cssClass: 'present-alert'
    });
    alert.present();
  }

}

interface User {
  username: string;
  password: string;
}
