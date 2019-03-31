import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController } from 'ionic-angular';
import { Evento } from '../../models/evento.models';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario.service';
import { UtilsServiceProvider } from '../../providers/utils.service';
import { EventoService } from '../../providers/evento.service';
import { ListaEventosPage } from '../lista-eventos/lista-eventos';

/**
 * Generated class for the DetalleComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detalle-comentario',
  templateUrl: 'detalle-comentario.html',
})
export class DetalleComentarioPage {

  evento: Evento = new Evento()
  
  usuario: Usuario = new Usuario()

  comentario: string = "No se han ingresado comentarios aún"


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loader: LoadingController, private usuServ: UsuarioService,
    private utilServ: UtilsServiceProvider, private eventServ: EventoService) {
    this.evento = this.navParams.get('evento')
  }

  async ionViewWillEnter() {

    this.usuario = this.usuServ.usuario
    try {

      let resp: any = await this.eventServ.getEvento(this.evento._id).toPromise()
      if (resp) {
        this.evento = resp.data.evento
        let filtroComentarios = this.evento.registrosDT.filter((com)=>{return com.jugadorId === this.usuario._id})
        if(filtroComentarios.length > 0)
        this.comentario = filtroComentarios[0].comentario

      }
    } catch (e) {
      console.log(e)
    }
  }



  
  
  

}
