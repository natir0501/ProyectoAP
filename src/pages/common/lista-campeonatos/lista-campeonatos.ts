import { Campeonato } from './../../../models/campeonato.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CampeonatoService } from '../../../providers/campeonato.service';
import { UtilsServiceProvider } from '../../../providers/utils.service';

@IonicPage()
@Component({
  selector: 'page-lista-campeonatos',
  templateUrl: 'lista-campeonatos.html',
})
export class ListaCampeonatosPage {

  campeonatos: Campeonato[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService, public utilServ: UtilsServiceProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner : 'circles'
    });
    loading.present()
  
    this.campServ.obtenerCampeonatos()
      .subscribe((resp) => {
        this.campeonatos = resp.data.campeonatos;
      },
        (err) => {
          console.log("Error obteniendo los campeonatos del club", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los campeonatos")
        },()=>{
          loading.dismiss();
        })
  }

  consultarCampeonato(campeonato: Campeonato) {
    //this.navCtrl.push(page de mantCampeonato, {campeonato})
    console.log(campeonato);
    
  }

  irAltaCamp(){
    //this.navCtrl.push(mantCampeonato)
  }


}
