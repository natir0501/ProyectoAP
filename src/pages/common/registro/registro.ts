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
  

  posiciones = Object.keys(Posiciones).map(key => ({ 'id': key, 'value': Posiciones[key] }))
  posicionesElegidas: string[] = ['GK'];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private usuarioServ: UsuarioService,
    private toast: ToastController,
    private util: UtilsServiceProvider) {

  }

  ngOnInit() {

    this.usuario =  {
    '_id':'0',  
    'apellido': "Arce",
    "celular": "099064178",
    "contacto": "Padre 123456",
    "direccion": "Dirección",
    "documento": "12345678",
    "emergencia": "SEMM",
    "fmedica": {vigente: true, fvenc: "2018-11-23"},
    "fnac": "1988-05-23",
    "nombre": "Gabriel",
    "password": "ga230588",
    "sociedad": "Casmu",
    "posiciones":  ['LTD','DF']
  }
  }

  ionViewDidLoad() {



    let token = this.navParams.get('token')
    this.usuarioServ.getUserByToken(token).subscribe((resp) =>{
      this.usuario._id = resp.data._id
      this.usuarioServ.setTokenInStorage(token)
      console.log('Seteo Id', this.usuario._id)
    },(err)=>{console.log(err)})
    
    



  }

  onSubmit() {

    if(this.validoUsuario()){
      console.log('Usuario valido')
      this.usuarioServ.actualizarUsuario(this.usuario).subscribe((resp)=>{
        console.log('Si!')

      },(err)=>{
        console.log(err)
      })
    }
    
  }

  validoUsuario() : boolean{
    console.log(this.usuario)
    if(Date.parse(this.usuario.fnac) >= Date.now())
    {
      this.util.dispararAlert('Fecha de Nacimiento',"Fecha de nacimiento inválida")
      return false
    }
    if(this.usuario.fmedica.vigente && Date.parse(this.usuario.fmedica.fvenc) <= Date.now())
    {
      this.util.dispararAlert('F/Médica - C/ Salud',"Fecha de vencimiento inválida")
      return false
    }
    return true
  }
  

}
