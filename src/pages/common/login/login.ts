import { HomePage } from './../../home/home';
import { UsuarioService } from './../../../providers/usuario.service';
import { Usuario } from './../../../models/usuario.model';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UtilsServiceProvider } from '../../../providers/utils.service';


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
  usuario: Usuario = new Usuario()


  constructor(public navCtrl: NavController, public utils: UtilsServiceProvider, public navParams: NavParams, private usuarioServ: UsuarioService) {

  }




  onSubmit() {
    
    this.usuarioServ.login(this.usuario).subscribe((resp) => {
      this.utils.dispararAlert('Login Correcto', `Bienvenido ${resp.usuario.nombre}!`)
      
      this.usuarioServ.setUsuario(resp.usuario)
      this.navCtrl.setRoot(HomePage)
    },(err)=>{console.log(err)})



  }

}
