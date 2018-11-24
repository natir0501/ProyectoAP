import { LoginPage } from './../login/login';
import { Posiciones } from './../../../models/enum.models';
import { UsuarioService } from './../../../providers/usuario.service';
import { Usuario } from './../../../models/usuario.model';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, NgControl, FormControl } from '@angular/forms';
import { UtilsServiceProvider } from '../../../providers/utils.service';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({

  segment: 'registro/:token'
})
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',

})
export class RegistroPage implements OnInit {

  @ViewChild('form') form: NgForm

  usuario: Usuario = new Usuario()
  fmedicaVigente: boolean = false
  fechaVtoTxt: string = '2018-11-24'
  fechaNacTxt: string = '1988-05-23'

  posiciones = Object.keys(Posiciones).map(key => ({ 'id': key, 'value': Posiciones[key] }))
  posicionesElegidas: string[] = ['GK'];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private usuarioServ: UsuarioService,
    private toast: ToastController,
    private util: UtilsServiceProvider) {

  }

  ngOnInit() {

  }
  ionViewCanEnter() {
    let token = this.navParams.get('token')
    this.usuarioServ.getUserByToken(token).subscribe((resp) => {

      if (resp.data.activo) {
        this.util.dispararAlert('Registro completo', 'Ya has completado el registro')
        this.navCtrl.goToRoot({})
      }
      this.usuario._id = resp.data._id

      this.usuarioServ.setTokenInStorage(token)

    }, (err) => { console.log(err) })

  }
  ionViewDidLoad() {
    







  }

  onSubmit() {

    if (this.validoUsuario()) {
      this.usuario.activo = true;
      this.usuarioServ.actualizarUsuario(this.usuario).subscribe((resp) => {
        this.util.dispararAlert('Éxito', "Registro realizado correctamente")

      }, (err) => {
        this.util.dispararAlert('Error', "Error al dar de alta, intente nuevamente")
        console.log(err)
      })
    }

  }

  validoUsuario(): boolean {


    this.usuario.fechaNacimiento = Date.parse(this.fechaNacTxt)
    if (this.usuario.fechaNacimiento >= Date.now()) {
      this.util.dispararAlert('Fecha de Nacimiento', "Fecha de nacimiento inválida")
      return false
    }
    if (this.fmedicaVigente && Date.parse(this.fechaVtoTxt) <= Date.now()) {
      this.util.dispararAlert('F/Médica - C/ Salud', "Fecha de vencimiento inválida")
      return false
    }
    this.usuario.fechaVtoCarneSalud = Date.parse(this.fechaVtoTxt)
    return true
  }
  goToLogin() {
    this.navCtrl.push(LoginPage)
  }

}
