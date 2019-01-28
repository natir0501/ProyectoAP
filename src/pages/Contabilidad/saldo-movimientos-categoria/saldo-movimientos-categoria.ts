import { ConceptoService } from './../../../providers/concepto.service';
import { DetalleMovimientoPage } from './../../detalle-movimiento/detalle-movimiento';
import { Usuario } from './../../../models/usuario.model';
import { UtilsServiceProvider } from './../../../providers/utils.service';
import { CuentaService } from './../../../providers/cuenta.service';
import { Cuenta, Movimiento } from './../../../models/cuenta.models';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../models/categoria.models';
import { UsuarioService } from '../../../providers/usuario.service';
import { ConceptoCaja } from '../../../models/concepto.models';
import { Tipos } from '../../../models/enum.models';


@Component({
  selector: 'page-saldo-movimientos-categoria',
  templateUrl: 'saldo-movimientos-categoria.html',
})
export class SaldoMovimientosCategoriaPage {

  cuenta: Cuenta = new Cuenta();
  movimientos: Movimiento[] = []
  mov: Movimiento = new Movimiento;
  categoria: Categoria = new Categoria()
  usuarios: Usuario[] = [];
  btnMovs: string = '+';
  verMovs: boolean = false;
  btnFiltros: string = '+';
  verFiltros: boolean = false;
  concepto: ConceptoCaja = new ConceptoCaja;
  listaConceptos: ConceptoCaja[] = [];
  tipo = Object.keys(Tipos).map(key => ({ 'id': key, 'value': Tipos[key] }));
  fDesdeTxt: string = 'aaaa-mm-dd'
  fHastaTxt: string = 'aaaa-mm-dd'



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl: LoadingController
    , public utilServ: UtilsServiceProvider, public catService: CategoriaService,
    public usuServ: UsuarioService, public conceptoServ: ConceptoService) {
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present();

    this.categoria._id = this.usuServ.usuario.perfiles[0].categoria
    let dataUsuarios: any = await this.catService.obtenerCategoria(this.categoria._id).toPromise()
    if (dataUsuarios) {
      this.categoria = dataUsuarios.data.categoria
    }
    this.cuenta = this.categoria.cuenta

    let conc = await this.conceptoServ.obtenerConceptos().toPromise()

    if (conc) {
      this.listaConceptos = conc.data.conceptosCaja;
    }

    this.cuentaServ.obtenerMovimientos(this.cuenta._id)
      .subscribe((resp) => {
        this.cuenta.movimientos = resp.data.movimientos;
        this.movimientos = resp.data.movimientos;
        console.log(this.cuenta)
      },
        (err) => {
          console.log("Error obteniendo movimientos", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los movimientos")
          loading.dismiss();
        }, () => {
          loading.dismiss();
        })
  }

  verDetalle(mov) {
    this.navCtrl.push((DetalleMovimientoPage), { mov })
  }

  exportarPDF() {
    console.log("voy a exportar");
    console.log(this.movimientos)
    let columnas = ['Fecha', 'Importe', 'Tipo', 'Concepto', 'Usuario']
    let contenidoFilas = []
    for (let m of this.movimientos) {
      let fila = [new Date(m.fecha).toLocaleDateString(), m.monto, m.tipo, m.concepto, m.usuario]
      contenidoFilas.push(fila)
    }
    this.utilServ.generarPDF(columnas, contenidoFilas, `Movimientos`, 'h')
  }

  toggle(lista: string) {
    if (lista === 'verMovs') {
      if (!this.verMovs) {
        this.btnMovs = '-'
      } else {
        this.btnMovs = '+'
      }
      this.verMovs = !this.verMovs
    }
    if (lista === 'filtros') {
      if (!this.verFiltros) {
        this.btnFiltros = '-'
      } else {
        this.btnFiltros = '+'
      }
      this.verFiltros = !this.verFiltros

    }
  }

  filtrar() {

    //Si no apliqué ningún filtro, ya muestro los movimientos y oculto sección filtros.
    if (this.noHayFiltros()) {
      this.btnFiltros = '+'
      this.verFiltros = !this.verFiltros
      this.toggle('verMovs');
      this.movimientos = this.cuenta.movimientos
    } else {
      if (this.validoFechas()) {
        console.log("Todo OK 2");
        //Acá voy a llamar al servicio. 

      }
    }
    console.log("Tipo", this.tipo);
    console.log("Conce", this.concepto);
    console.log("F Desde", this.fDesdeTxt);
    console.log("F Hasta", this.fHastaTxt);

  }

  noHayFiltros(): boolean {
    return this.tipo.length === 3 && this.concepto._id === "" && this.fDesdeTxt === 'aaaa-mm-dd' && this.fHastaTxt === 'aaaa-mm-dd';
  }

  validoFechas(): boolean {

    if (this.fDesdeTxt !== 'aaaa-mm-dd' && this.fHastaTxt !== 'aaaa-mm-dd') {
      let fechaD = Date.parse(this.fDesdeTxt) + 86400000
      let fechaH = Date.parse(this.fHastaTxt) + 86400000
      console.log("D", fechaD, "H", fechaH)
      if (fechaH > fechaD) {
        if (fechaH >= Date.now()) {
          this.utilServ.dispararAlert('Error', "Fecha Hasta no puede ser superior a la fecha de hoy.")
          return false
        } else {
          return true;
        }
      } else {
        this.utilServ.dispararAlert('Error', "Rango de fechas inválido")
        return false
      }


    } else {
      this.utilServ.dispararAlert('Error', "Para filtrar por fechas se debe ingresar fecha desde y fecha hasta")
      return false
    }

  }

}
