import { CategoriaService } from './../../providers/categoria.service';
import { UsuarioService } from './../../providers/usuario.service';
import { UtilsServiceProvider } from './../../providers/utils.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Categoria, Cuenta, Movimiento } from '../../models/categoria.models';
import { Usuario } from '../../models/usuario.model';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-saldos-jugadores',
  templateUrl: 'saldos-jugadores.html',
})
export class SaldosJugadoresPage {

  categoria: Categoria = new Categoria()
  jugador : Usuario=new Usuario()
  cuentaJugador: Cuenta = new Cuenta()
  usuarios: Usuario[] = [];
  movimiento: Movimiento=new Movimiento()
  movimientos: Movimiento[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utilServ: UtilsServiceProvider, private loadingCtrl: LoadingController,
    public usuServ: UsuarioService, public catServ: CategoriaService) {
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()
    this.categoria._id = this.usuServ.usuario.perfiles[0].categoria
    let dataUsuarios: any = await this.catServ.obtenerCategoria(this.categoria._id).toPromise()
    if (dataUsuarios) {
      this.categoria = dataUsuarios.data.categoria
      this.usuarios=this.categoria.jugadores
      loading.dismiss();
    }else{
      this.utilServ.dispararAlert("Upss! :(", "Ocurrió un error al cargar los jugadores de la categoría. Volvé a intentar en unos minutos.")
      loading.dismiss();
      this.navCtrl.setRoot(HomePage)

  }

}}
