import { TipoEventosPage } from './../Backoffice/tipo-eventos/tipo-eventos';
import { ConceptosDeCajaPage } from '../Backoffice/conceptos-de-caja/conceptos-de-caja';
//import { AltaDeUsuarioPage } from '../Backoffice/alta-usuario';
import { UtilsServiceProvider } from './../../providers/utils.service';
import { Usuario } from './../../models/usuario.model';
import { LoginPage } from './../common/login/login';
import { UsuarioService } from './../../providers/usuario.service';
import { FirebaseMessagingProvider } from './../../providers/firebase-messaging';
import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { AltaConceptosDeCajaPage } from '../Backoffice/alta-conceptos-de-caja/alta-conceptos-de-caja';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: Usuario = new Usuario()
  constructor(public navCtrl: NavController, private alertCtrk: AlertController,
    private platform: Platform, public fmp: FirebaseMessagingProvider,
    private userServ: UsuarioService, public util: UtilsServiceProvider) {

  }
  ionViewWillEnter() {
    
    

  }
  showPlatform() {
    let text = '' + this.platform.platforms();
    let alert = this.alertCtrk.create({
      title: 'My home',
      subTitle: text,
      buttons: ['OK']
    })
    alert.present()

  }






}
