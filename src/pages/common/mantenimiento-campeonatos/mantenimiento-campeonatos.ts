import { CategoriaService } from './../../../providers/categoria.service';
import { UsuarioService } from './../../../providers/usuario.service';
import { CampeonatoService } from './../../../providers/campeonato.service';
import { Campeonato, Fecha } from './../../../models/campeonato.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { ListaCampeonatosPage } from '../lista-campeonatos/lista-campeonatos';
import { MantenimientoFechaPage } from '../../Backoffice/mantenimiento-fecha/mantenimiento-fecha';
import { Categoria } from '../../../models/categoria.models';
import { DetalleFechaPage } from '../../detalle-fecha/detalle-fecha';


@Component({
  selector: 'page-mantenimiento-campeonatos',
  templateUrl: 'mantenimiento-campeonatos.html',
})
export class MantenimientoCampeonatosPage {

  campeonato: Campeonato = new Campeonato();
  fecha: Fecha = new Fecha;
  fechas: Fecha[] = [];
  categoria: Categoria = new Categoria()

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService,
    public utilServ: UtilsServiceProvider,
    public usuServ: UsuarioService,
    public catService: CategoriaService) {
  }

  ionViewDidLoad() {
    let camp: Campeonato = this.navParams.get('campeonato')
    if (camp) {
      this.campeonato = camp
      this.fechas = camp.fechas
      console.log(camp);
      
    }
  }

  async onSubmit() {
    if (this.campeonato._id === '') {

      this.categoria._id = this.usuServ.usuario.perfiles[0].categoria
      let dataUsuarios: any = await this.catService.obtenerCategoria(this.categoria._id).toPromise()
      if (dataUsuarios) {
        this.categoria = dataUsuarios.data.categoria
      }
      this.campeonato.categoria=this.categoria
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

  editarFecha(fech: Fecha) {
    let fecha=fech
    let camp=this.campeonato
    this.navCtrl.push((MantenimientoFechaPage), {fecha,camp})
    console.log("Editar fecha");

  }

  consultarFecha(fech: Fecha) {
    let fecha=fech
    this.navCtrl.push((DetalleFechaPage), {fecha})
    console.log("Mi fecha", fecha);
    
    console.log("Consultar fecha");

  }


  agregarFecha() {
    let camp = this.campeonato;
    console.log("agregarFecha en Mant page", this.campeonato);
    this.navCtrl.push((MantenimientoFechaPage), { camp })
    console.log("agregarFecha en Mant page camp ", camp);
    
  }


}
