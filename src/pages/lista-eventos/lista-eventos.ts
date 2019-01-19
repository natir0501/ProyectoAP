import { ListaRegistroEventoPage } from './../lista-registro-evento/lista-registro-evento';
import { CategoriaService } from './../../providers/categoria.service';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../providers/usuario.service';
import { Categoria } from './../../models/categoria.models';
import { EventoService } from './../../providers/evento.service';
import { ModificarEventoPage } from './../modificar-evento/modificar-evento';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Evento } from '../../models/evento.models';
import { isRightSide } from 'ionic-angular/umd/util/util';
import { DetallesEventoPage } from '../detalles-evento/detalles-evento';

/**
 * Generated class for the ListaEventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-lista-eventos',
  templateUrl: 'lista-eventos.html',
})
export class ListaEventosPage {
  eventos: Evento[] = []
  eventosDelDia: Evento[] = []
  currentEvents = []
  fechaSeleccionada: Date = new Date()
  categoria: Categoria = new Categoria()
  roles  = []
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventoServ: EventoService
    , private usuServ: UsuarioService, private categoriaServ : CategoriaService) {
    this.categoria._id = this.usuServ.usuario.perfiles[0].categoria
    
  }

  async ionViewDidLoad() {
    await this.cargarEventos(new Date().getFullYear(), new Date().getMonth())
    let resp2 = await this.categoriaServ.obtenerRoles().toPromise()
 
    this.roles = resp2.data.roles
    this.eventosDelDia = this.eventos.filter((evt) => new Date(evt.fecha).getDate() === new Date().getDate())
  }

  altaEvento() {
    this.navCtrl.push(ModificarEventoPage, { fecha: this.fechaSeleccionada })
  }
  editarEvento(evento: Evento) {
    this.navCtrl.push(ModificarEventoPage, { evento })
  }
  detalles(evento: Evento) {
    this.navCtrl.push(DetallesEventoPage, { evento })
  }

  onDateSelected(data: any) {
    this.fechaSeleccionada = new Date(data.year, data.month, data.date)
    this.eventosDelDia = this.eventos.filter((evt) => new Date(evt.fecha).getDate() === data.date)
  }

  onMonthSelect(data: any) {
    this.cargarEventos(data.year, data.month)
    this.eventosDelDia = []
  }

  esDelegado() {
    let usuario: Usuario = this.usuServ.usuario
    if (usuario.delegadoInstitucional) return true
    for (let usu of this.categoria.delegados) {
      if (usu._id === usuario._id) {
        return true
      }
    }
  }

  async cargarEventos(year: number, mes: number) {
    let fechaInicio = new Date(year, mes, 0)
    let fechaFin = new Date(year, mes + 1, 1)
    try {
      let resp: any = await this.eventoServ.obtenerEventos(fechaInicio.valueOf(), fechaFin.valueOf()).toPromise()
      if (resp) {
        this.eventos = resp.data.eventos
        this.currentEvents = this.eventos.map(evt => ({
          year: new Date(evt.fecha).getFullYear(),
          month: new Date(evt.fecha).getMonth(),
          date: new Date(evt.fecha).getDate()
        })
        )

      }

    } catch (e) {
      console.log(e)
    }

  }

  puedeEditar(evento: Evento): boolean {
    return evento.fecha > Date.now()
  }

  puedeCrear(): boolean {
    return new Date(this.fechaSeleccionada.getFullYear(), this.fechaSeleccionada.getMonth(), this.fechaSeleccionada.getDate() + 1).valueOf() > Date.now()
  }
  registrosDT() {
    let rolDt = this.roles.filter((rol)=> rol.codigo === 'DTS')[0]
    
    let usuario: Usuario = this.usuServ.usuario
    for(let rol of usuario.perfiles[0].roles){
      if(rol === rolDt._id && this.fechaSeleccionada.valueOf()<Date.now()){
        return true
      }
    }
    return false
  }
  registrar(evento : Evento){
    this.navCtrl.push(ListaRegistroEventoPage,{evento})
  }

}
