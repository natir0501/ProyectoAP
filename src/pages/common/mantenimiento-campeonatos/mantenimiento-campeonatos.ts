import { CampeonatoService } from './../../../providers/campeonato.service';
import { Campeonato, Fecha } from './../../../models/campeonato.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { ListaCampeonatosPage } from '../lista-campeonatos/lista-campeonatos';
import { MantenimientoFechaPage } from '../../Backoffice/mantenimiento-fecha/mantenimiento-fecha';

/**
 * Generated class for the MantenimientoCampeonatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento-campeonatos',
  templateUrl: 'mantenimiento-campeonatos.html', 
})
export class MantenimientoCampeonatosPage {

  campeonato: Campeonato = new Campeonato;
  fecha: Fecha = new Fecha;
  fechas : Fecha [] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService,
    public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    let camp: Campeonato = this.navParams.get('campeonato')
    if (camp) {
      console.log("ACAAA",camp);
      
      this.campeonato = camp
      this.fechas = camp.fechas
    }
  }

  onSubmit() {
    if (this.campeonato._id === '') {
      this.campServ.agregarCampeonato(this.campeonato)
        .subscribe(
          (resp) => {
            this.utilServ.dispararAlert("Ok", "Campeonato agregado correctamente.")
            this.navCtrl.setRoot(ListaCampeonatosPage)
          },
          (err) => {
            console.log("Error dando de alta el campeonato", err)
            this.utilServ.dispararAlert("Error", "Ocurrió un error al agregar el campeonato")
          }
        )

    } else {
      /*TDB*/
      this.campServ.actualizarCampeonato(this.campeonato)
        .subscribe(
          (resp) => {
            this.utilServ.dispararAlert("Ok", "Campeonato modificado correctamente.")
            this.navCtrl.setRoot(ListaCampeonatosPage)
          },
          (err) => {
            console.log("Error al modificar el campeonato", err)
            this.utilServ.dispararAlert("Error", "Ocurrió un error al modificar el campeonato")
          }
        )

    }

  }

  editarFecha(fech : Fecha){
    console.log("Editar fecha");
    
  }

  consultarFecha(fech : Fecha){
    console.log("Consultar fecha");
    
  }

  altaFecha(){
    console.log("ir a alta de fecha");
  }
  agregarFecha(){
    let camp=this.campeonato
    this.navCtrl.push((MantenimientoFechaPage), {camp})
  }


}
 