import { UsuarioService } from './../../../providers/usuario.service';
import { MantenimientoCampeonatosPage } from './../../common/mantenimiento-campeonatos/mantenimiento-campeonatos';
import { Partido, Campeonato, Fecha, Lugar } from './../../../models/campeonato.model';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { CampeonatoService } from '../../../providers/campeonato.service';
import { NgForm } from '@angular/forms';
import { Ruedas } from '../../../models/enum.models';

/**
 * Generated class for the MantenimientoFechaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento-fecha',
  templateUrl: 'mantenimiento-fecha.html',
})
export class MantenimientoFechaPage {

  @ViewChild('form') form: NgForm

  campeonato: Campeonato = new Campeonato();
  fecha: Fecha = new Fecha();
  partido: Partido = new Partido();
  lugar: Lugar = new Lugar();
  fechaEncuentrotxt = `2019-01-04T02:01`;
  rueda = Object.keys(Ruedas).map(key => ({ 'id': key, 'value': Ruedas[key] }));

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService,
    public utilServ: UtilsServiceProvider,
    public usuServ: UsuarioService) {
    this.fechaEncuentrotxt = this.utilServ.fechahoraToText(new Date())
  }

  ionViewDidLoad() {
    let fecha: Fecha = this.navParams.get('fecha')    
    let camp: Campeonato = this.navParams.get('camp')
    if (fecha) {
      console.log("Solo voy a editar");
      this.fecha = fecha
    }
    if(camp){
      this.campeonato = camp
    }
  }

  onSubmit() {

    this.fecha.fechaEncuentro = Date.parse(this.form.value.fechaEncuentro)
    console.log("FECHA A AGREGAR", this.fecha);
    
    if (this.fecha._id === '') {      
    
      this.campServ.agregarFechaCamp(this.fecha, this.campeonato)
        .subscribe(
          (resp) => {
            this.utilServ.dispararAlert("Ok", "Fecha agregada correctamente.")
            let camp=this.campeonato;
            this.navCtrl.push((MantenimientoCampeonatosPage), {camp});
          },
          (err) => {
            console.log("Error dando de alta el campeonato", err)
            this.utilServ.dispararAlert("Error", "Ocurrió un error al agregar el campeonato")
          })
    }else{
      console.log(this.fecha);
    }
  }


}
