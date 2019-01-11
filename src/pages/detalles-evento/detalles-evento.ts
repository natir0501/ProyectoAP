import { UsuarioService } from './../../providers/usuario.service';
import { ListaEventosPage } from './../lista-eventos/lista-eventos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Evento } from '../../models/evento.models';
import { Usuario } from '../../models/usuario.model';

/**
 * Generated class for the DetallesEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles-evento',
  templateUrl: 'detalles-evento.html',
})
export class DetallesEventoPage {

  evento: Evento = new Evento()
  btnConvocados: string = '+'
  btnVan: string = '+'
  btnNoVan: string = '+'
  verConvocados : boolean = false
  verVan : boolean = false
  verNoVan: boolean = false
  usuario : Usuario = new Usuario()

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuServ: UsuarioService) {
    this.evento = this.navParams.get('evento')
  }

  ionViewDidLoad() {
    this.usuario = this.usuServ.usuario
  }

  

  goBack(){
    this.navCtrl.setRoot(ListaEventosPage)
  }
  descUsu(usu: Usuario) {
    if (usu.nombre) {
      return usu.nombre
    }
    return usu.email
  }
  toggle(lista: string) {
    if (lista === 'convocados') {
      if (this.verConvocados) {
        this.btnConvocados = '-'
      } else {
        this.btnConvocados = '+'
      }
      this.verConvocados = !this.verConvocados
    }
    if (lista === 'van') {
      if (this.verVan) {
        this.btnVan = '-'
      } else {
        this.btnVan = '+'
      }
      this.verVan = !this.verVan
    }
    if (lista === 'noVan'){
      if (this.verNoVan) {
        this.btnNoVan = '-'
      } else {
        this.btnNoVan = '+'
      }
      this.verNoVan = !this.verNoVan
    }
  }

  diayhora():string{
    return new Date(this.evento.fecha).toLocaleString()
  }
}
