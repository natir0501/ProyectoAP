import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { Categoria, Movimiento } from './../../../models/categoria.models';
import { ConceptoCaja } from './../../../models/concepto.models';
import { Cuenta } from './../../../models/cuenta.models';
import { Usuario } from './../../../models/usuario.model';
import { CategoriaService } from './../../../providers/categoria.service';
import { ConceptoService } from './../../../providers/concepto.service';
import { CuentaService } from './../../../providers/cuenta.service';
import { UsuarioService } from './../../../providers/usuario.service';

@Component({
  selector: 'page-registro-mov-caja',
  templateUrl: 'registro-mov-caja.html',
})
export class RegistroMovCajaPage {

  conceptos: ConceptoCaja[] = [];
  categorias: Categoria[] = [];
  categoriaDestino: Categoria;
  catUsuario: Categoria
  concepto: ConceptoCaja = new ConceptoCaja()
  cuenta: Cuenta = new Cuenta()
  movimiento: Movimiento = new Movimiento()
  transferencia: boolean
  usuario: Usuario = new Usuario()

  @ViewChild("form") form: NgForm

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl: LoadingController
    , public utilServ: UtilsServiceProvider, public conceptoServ: ConceptoService,
    public catServ: CategoriaService, public usuServ: UsuarioService) {
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()
    try {

      this.usuario = this.usuServ.usuario

      let resp: any = await this.catServ.obtenerCategorias().toPromise()
      if (resp) {
        this.categorias = resp.data.categorias
        this.categorias = this.categorias.filter(cat => {
          if (cat._id !== this.usuario.perfiles[0].categoria) {
            return true
          } else {
            this.catUsuario = cat
            return false
          }
        }

        )
        this.categoriaDestino = this.categorias[0]
      }

      let conc = await this.conceptoServ.obtenerConceptos().toPromise()

      if (conc) {
        this.conceptos = conc.data.conceptosCaja;
        this.concepto = this.conceptos[0]
        console.log(this.conceptos);

      }
      loading.dismiss();
    } catch (e) {
      console.log("Error obteniendo datos", e)
      this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los datos")
      loading.dismiss();
    }
  }

  onSubmit() {

    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()


    let payload: any = {
      movimiento: {
        tipo: this.concepto.tipo,
        fecha: Date.now(),
        monto: this.concepto.tipo === 'Egreso'? -this.form.value.monto: this.form.value.monto,
        concepto: this.concepto._id,
        usuario: this.usuario._id,
        estado: "Confirmado"

      },
    }

    if (this.concepto.nombre === "Transferencia de Saldos") {
      payload = { ...payload, idcategoria: this.categoriaDestino._id, idcuenta: this.categoriaDestino.cuenta._id }

      this.cuentaServ.transferenciaSaldo(payload, this.catUsuario.cuenta._id).subscribe((resp) => {
        this.utilServ.dispararAlert("Ok", "Transferencia realizada correctamente.")
        this.form.form.patchValue({ monto: 0, comentario: "" })
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
        this.utilServ.dispararAlert("Error", "Error al registrar el movimiento. Intentá nuevamente en unos minutos.")
      })
    } else {
      this.cuentaServ.ingresarMovimiento(payload, this.catUsuario.cuenta._id).subscribe((resp) => {
        this.utilServ.dispararAlert("Ok", "Se ingresó correctamente el movimiento.")
        this.form.form.patchValue({ monto: 0, comentario: "" })
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
        this.utilServ.dispararAlert("Error", "Error al registrar el movimiento. Intentá nuevamente en unos minutos.")
      })

    }


  }

  cargueConcepto(): boolean {
    return (this.concepto._id != "")
  }

}


