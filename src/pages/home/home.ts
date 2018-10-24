import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private alertCtrk: AlertController, private platform: Platform) {

  }

  showPlatform(){
    let text = '' + this.platform.platforms();
    let alert= this.alertCtrk.create({
      title: 'My home',
      subTitle: text,
      buttons: ['OK']
    })
    alert.present()

  }

}
