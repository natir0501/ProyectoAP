import { SaldoMovimientosCategoriaPage } from './../Contabilidad/saldo-movimientos-categoria/saldo-movimientos-categoria';
import { MantenimientoCategoriaPage } from './../mantenimiento-categoria/mantenimiento-categoria';
import { CategoriaService } from './../../providers/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Categoria } from '../../models/categoria.models';
import { UtilsServiceProvider } from '../../providers/utils.service';

/**
 * Generated class for the ListaCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-categorias',
  templateUrl: 'lista-categorias.html',
})
export class ListaCategoriasPage {

  categorias: Categoria[] = [new Categoria()];


  constructor(public navCtrl: NavController, public navParams: NavParams
    , public catService: CategoriaService, public utilServ: UtilsServiceProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()

    this.catService.obtenerCategorias()
      .subscribe((resp) => {

        this.categorias = resp.data.categorias;



      },
        (err) => {
          console.log("Error obteniendo conceptos de caja", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los conceptos de caja")
        }, () => {
          loading.dismiss();
        })
  }



  irAlta() {
    
    this.navCtrl.setRoot(MantenimientoCategoriaPage)
  }

  modificar(categoria: Categoria) {
    
    this.navCtrl.setRoot(MantenimientoCategoriaPage, { categoria })
  }

  verSdos(categoria: Categoria) {
    this.navCtrl.setRoot(SaldoMovimientosCategoriaPage, {'cuenta':categoria.cuenta})
   
    
  }


}
