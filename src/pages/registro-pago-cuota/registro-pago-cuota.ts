import { Movimiento } from './../../models/cuenta.models';
import { ConceptoService } from './../../providers/concepto.service';
import { Usuario } from './../../models/usuario.model';
import { Cuenta, Concepto } from './../../models/categoria.models';
import { UsuarioService } from './../../providers/usuario.service';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CuentaService } from '../../providers/cuenta.service';
import { UtilsServiceProvider } from '../../providers/utils.service';
import { CategoriaService } from '../../providers/categoria.service';
import { Categoria } from '../../models/categoria.models';
import { HomePage } from '../home/home';
import { empty } from 'rxjs/Observer';


@Component({
  selector: 'page-registro-pago-cuota',
  templateUrl: 'registro-pago-cuota.html',
})
export class RegistroPagoCuotaPage {

  categoria: Categoria = new Categoria()
  cuentaCat: Cuenta = new Cuenta()
  cuentaJugador: Cuenta = new Cuenta()
  usuario: Usuario=new Usuario()
  usuarios: Usuario[] = [];
  concepto: Concepto= new Concepto()
  movimiento: Movimiento=new Movimiento()

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl: LoadingController,
    public utilServ: UtilsServiceProvider, public usuServ: UsuarioService,
    public catService: CategoriaService, public conceptoServe : ConceptoService) {
  }

  async ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()

    this.usuario=this.usuServ.usuario
    this.categoria._id = this.usuServ.usuario.perfiles[0].categoria
    let dataUsuarios: any = await this.catService.obtenerCategoria(this.categoria._id).toPromise()
    if (dataUsuarios) {
      this.categoria = dataUsuarios.data.categoria
      this.usuarios=this.categoria.jugadores

      this.conceptoServe.obtenerConceptos()
      .subscribe((resp) => {
        let conceptos = resp.data.conceptosCaja;
        for(let c of conceptos){
          if(c.nombre==="Pago de Cuota"){
            this.concepto=c
          }
        }
      },(err) => {
        this.utilServ.dispararAlert("Upss", "Ocurrió un error al obtener los conceptos de caja")
      },()=>{
        loading.dismiss();
      })
    }else{
      this.utilServ.dispararAlert("Upss! :(", "Ocurrió un error al cargar los jugadores de la categoría. Volvé a intentar en unos minutos.")
      loading.dismiss();
      this.navCtrl.setRoot(HomePage)
    }
  }

  onSubmit(){
    this.movimiento.usuario=this.usuServ.usuario
    this.movimiento.concepto=this.concepto
    this.movimiento.jugador= !this.registraPagosDeTerceros()?this.usuario:this.movimiento.jugador
    this.cuentaServ.registrarPagoCuota(this.movimiento)
    .subscribe((resp) =>{
      this.utilServ.dispararAlert("Listo!", "Pago registrado correctamente.")
      this.movimiento.comentario=""
      this.movimiento.monto=0
      this.movimiento.jugador=null

      
    },(err)=>{
      console.log(err);
      
    })
  }

  registraPagosDeTerceros(){
    let usuario : Usuario = this.usuServ.usuario
    if(usuario){
      if(usuario.delegadoInstitucional) return true
      for (let usu of this.categoria.tesoreros){
        if(usu._id === usuario._id){
          return true
        }
      }
    }
  }
  

}
