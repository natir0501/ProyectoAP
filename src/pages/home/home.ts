import { Component } from '@angular/core';
import { AlertController, NavController, Platform, LoadingController } from 'ionic-angular';
import { Evento } from '../../models/evento.models';
import { EventoService } from '../../providers/evento.service';
import { Categoria, Cuenta } from './../../models/categoria.models';
import { Usuario } from './../../models/usuario.model';
import { CategoriaService } from './../../providers/categoria.service';
import { FirebaseMessagingProvider } from './../../providers/firebase-messaging';
import { UsuarioService } from './../../providers/usuario.service';
import { UtilsServiceProvider } from './../../providers/utils.service';
import { DetallesEventoPage } from '../detalles-evento/detalles-evento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: Usuario = new Usuario()
  eventos: Evento[] = []
  categoria: Categoria = new Categoria()
  habilitoHome: boolean = false;
  cuenta : Cuenta = new Cuenta()

  constructor(public navCtrl: NavController, private alertCtrk: AlertController,
    private platform: Platform, public fmp: FirebaseMessagingProvider
    , private loader: LoadingController, private utilServ: UtilsServiceProvider,
    private userServ: UsuarioService, public util: UtilsServiceProvider, private catServ: CategoriaService
    , private eventServ: EventoService) {

  }
  async ionViewWillEnter() {
    try {

      if (this.userServ.usuario && this.userServ.usuario.perfiles.length === 1) {
        this.usuario = this.userServ.usuario
        let resp: any = await this.catServ.obtenerCategoria(this.usuario.perfiles[0].categoria).toPromise()
        if (resp) {

          this.categoria = resp.data.categoria
          this.obtenerEventos()
          let resp2 = await this.userServ.getCuenta(this.usuario._id).toPromise()
          if(resp2){
            this.cuenta = resp2.data.cuenta
            this.habilitoHome = true;
          }
        }
      }
    } catch (e) {
      console.log(e)
    }



  }

  getSubtitulo(evento: Evento){
    let date = new Date(evento.fecha)
    let dia = date.getDate() >= 10 ? date.getDate() : '0'+date.getDate()
    let mes = date.getMonth() >= 10 ? date.getMonth() + 1 : '0'+(date.getMonth()+1)
    let anio = date.getFullYear()
    let hora = date.getHours() >= 10 ? date.getHours() : '0'+ date.getHours()
    let minutos = date.getMinutes() >= 10 ? date.getMinutes() : '0'+ date.getMinutes()

    return `${dia}/${mes}/${anio} - ${hora}:${minutos} hs. - ${evento.tipoEvento.nombre}`
  }

  get fechaCuota(){
    
    return `${this.categoria.diaVtoCuota}/${new Date().getMonth()+2}/${new Date().getFullYear()}`
  }

  async obtenerEventos() {
    try {


      let resp = await this.eventServ.obtenerEventosHome(this.usuario._id).toPromise()
      if (resp) {
        this.eventos = resp.data.eventos
        console.log(this.eventos)
      }

    } catch (e) {
      console.log(e)
    }
  }
  confirmar(asiste: boolean, evento: Evento) {
    try {

      let loader = this.loader.create({
        content: 'Cargando...',
        spinner: 'circles'

      })
      loader.present()
      this.eventServ.confirmar(this.usuario, asiste, evento._id).subscribe((resp) => {
        loader.dismiss()
        if (asiste) {
          this.utilServ.dispararAlert("Procesado", "Ha confirmado que asiste al evento")
        } else {
          this.utilServ.dispararAlert("Procesado", "Ha confirmado que no asiste al evento")
        }
        this.obtenerEventos()

      }, (err) => {
        console.log(err)
        this.utilServ.dispararAlert('Error', "No se ha podido completar la solicitud")
      })
    } catch (e) {
      console.log(e)
    }
  }

  detalles(evento: Evento) {
    this.navCtrl.push(DetallesEventoPage, { evento })
  }




}
