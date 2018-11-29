import { TipoEventosPage } from './../Backoffice/tipo-eventos/tipo-eventos';
import { ConceptosDeCajaPage } from '../Backoffice/conceptos-de-caja/conceptos-de-caja';
import { AltaDeUsuarioPage } from './../common/alta-usuario/alta-de-usuario';
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
    private platform: Platform, public fmp:FirebaseMessagingProvider,
    private userServ: UsuarioService, public util : UtilsServiceProvider) {

  }
  ionViewWillEnter() {
    
    this.userServ.tokenGuardado().then((token) => {
      
      if (!token) {
        this.navCtrl.setRoot(LoginPage)
        

      }else{
        this.userServ.token=token
        this.userServ.getUserByToken(token).subscribe((resp)=>{
          if(resp.data.usuario){
            this.userServ.setUsuario(resp.data.usuario)
            this.usuario = resp.data.usuario
          }
        })
      }
      
    })
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

  salir(){
    this.userServ.logOut().then(()=>{
      this.util.dispararAlert('Salir',`Hasta la vuelta, ${this.usuario.nombre}.`)
      this.navCtrl.setRoot(LoginPage)
    })
  }

  alta(){
    this.navCtrl.push(AltaDeUsuarioPage)
  }

  concepto(){
    this.navCtrl.push(AltaConceptosDeCajaPage, )
  }

  conceptosTodos(){
    this.navCtrl.push(ConceptosDeCajaPage)
  }

  tipoEventosTodos(){
    this.navCtrl.push(TipoEventosPage)
  }
  

}
