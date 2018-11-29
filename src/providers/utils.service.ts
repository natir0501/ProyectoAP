import { AlertController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class UtilsServiceProvider{
    
    apiUrl: string = ''
    
    constructor(private alertCtrl: AlertController){}

    dispararAlert(title: string, text: string, callback ?: any) {
        let alert = this.alertCtrl.create({
          title: title,
          message: text,
          buttons: [
            {
              text: 'Aceptar',
             // handler: callback()
             
            }
            
          ]
        });
        alert.present();
      }
}