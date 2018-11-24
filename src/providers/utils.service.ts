import { AlertController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class UtilsServiceProvider{

    constructor(private alertCtrl: AlertController){}

    dispararAlert(title: string, text: string, callback ?: Function) {
        let alert = this.alertCtrl.create({
          title: title,
          message: text,
          buttons: [
            {
              text: 'Aceptar'
             
            }
            
          ]
        });
        alert.present();
      }
}