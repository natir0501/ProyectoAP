import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: []
}


)
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('loginForm') loginForm: NgForm
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewCanEnter(){
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.loginForm.form.patchValue({nombre:'Hola'})
  }

  onSubmit(){
    console.log(this.loginForm)
    this.loginForm.form.patchValue({nombre:'Hola'})
  }

}
