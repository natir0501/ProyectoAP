import { CategoriaService } from './../../../providers/categoria.service';
import { Concepto, Categoria } from './../../../models/categoria.models';
import { ConceptoService } from './../../../providers/concepto.service';
import { ConceptoCaja } from './../../../models/concepto.models';
import { Component } from '@angular/core';
import { CuentaService } from './../../../providers/cuenta.service';
import { Cuenta, Movimiento } from './../../../models/cuenta.models';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { isRightSide } from 'ionic-angular/umd/util/util';

@Component({
  selector: 'page-registro-mov-caja',
  templateUrl: 'registro-mov-caja.html',
})
export class RegistroMovCajaPage {

  conceptos: ConceptoCaja[] = [];
  categorias: Categoria [] =[];
  concepto: ConceptoCaja = new ConceptoCaja()
  cuenta: Cuenta = new Cuenta()
  movimiento: Movimiento =new Movimiento()
  transferencia: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl: LoadingController
    , public utilServ: UtilsServiceProvider, public conceptoServ: ConceptoService,
    public catServ: CategoriaService) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()

    this.conceptoServ.obtenerConceptos()
      .subscribe((resp) => {
        this.conceptos = resp.data.conceptosCaja;

      },
        (err) => {
          console.log("Error obteniendo conceptos de caja", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los conceptos de caja")
        }, 
        () => {
          loading.dismiss();
        })
  }

  onSubmit() { }

  cargueConcepto(): boolean{
    return (this.concepto._id!="")
  }

}

