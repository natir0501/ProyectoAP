import { TipoEventoService } from './../../../providers/tipoevento.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { TipoEvento } from '../../../models/tipo.evento.models';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-tipo-eventos',
  templateUrl: 'tipo-eventos.html',
})
export class TipoEventosPage {

  tEventos: TipoEvento[] = [];

  @ViewChild("form") formulario: NgForm

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tipEventServ: TipoEventoService, public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    this.tipEventServ.obtenerEventos()
      .subscribe((resp) => {

        console.log(resp);

        this.tEventos = resp.data.tipoEventos;

      },
        (err) => {
          console.log("Error obteniendo tipos de Eventos", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los tipos de eventos")
        })
  }

  onSubmit() {

    console.log("Algo en tipo eventos");

  }

}
