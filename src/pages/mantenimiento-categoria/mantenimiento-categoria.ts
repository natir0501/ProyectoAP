import { ListaCategoriasPage } from './../lista-categorias/lista-categorias';
import { CategoriaService } from './../../providers/categoria.service';
import { UtilsServiceProvider } from './../../providers/utils.service';
import { Categoria } from './../../models/categoria.models';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm, Validators } from '@angular/forms';
import { EMAIL_VALIDATOR, EmailValidator } from '@angular/forms/src/directives/validators';
import { stringify } from '@angular/compiler/src/util';

/**
 * Generated class for the MantenimientoCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento-categoria',
  templateUrl: 'mantenimiento-categoria.html',
})
export class MantenimientoCategoriaPage {

  categoria : Categoria = new Categoria()
  correosJugadores: string[]
  correosDelegados: string[]
  correosTesoreros: string[]
  correosDts: string[]
  @ViewChild('form') form : NgForm
  reg : RegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  constructor(public navCtrl: NavController, public navParams: NavParams, public utils : UtilsServiceProvider,
    public load: LoadingController, private categoriaServ: CategoriaService) {
  }

  ionViewDidLoad() {
    let cat : Categoria = this.navParams.get('categoria')  
    
    if(cat){
      this.categoria=cat
    }
  }

  validarCorreos(correosStr : string): {valido: boolean, correos : string[]}{
    let correos: string [] = []
    if(correosStr.length>0){
       correos = correosStr.split(';')
      for(let correo of correos){
        if(!this.reg.test(correo)){
          return {valido: false, correos:[]};
        }
      }
    }
    
    return {valido: true, correos};

  }
  onSubmit(){
    let correosStr: string = this.form.form.get('correosJugadores').value
    let correosValidados = this.validarCorreos(correosStr)
    if(!correosValidados.valido){
      this.form.form.get('correosJugadores').setErrors({'incorrect':true})
      this.utils.dispararAlert('Error','Por favor revise correos de Jugadores')
      return 
    }
    this.correosJugadores = correosValidados.correos
    
    correosStr = this.form.form.get('correosDelegados').value
    correosValidados = this.validarCorreos(correosStr)
    if(!correosValidados.valido){
      this.form.form.get('correosDelegados').setErrors({'incorrect':true})
      this.utils.dispararAlert('Error','Por favor revise correos de Delegados')
      return 
    }
    this.correosDelegados = correosValidados.correos

    correosStr = this.form.form.get('correosTesoreros').value
    correosValidados = this.validarCorreos(correosStr)
    if(!correosValidados.valido){
      this.form.form.get('correosTesoreros').setErrors({'incorrect':true})
      this.utils.dispararAlert('Error','Por favor revise correos de Tesoreros')
      return 
    }

    this.correosTesoreros = correosValidados.correos

    correosStr = this.form.form.get('correosDT').value
    correosValidados = this.validarCorreos(correosStr)
    if(!correosValidados.valido){
      this.form.form.get('correosDT').setErrors({'incorrect':true})
      this.utils.dispararAlert('Error','Por favor revise correos de Dts')
      return 
    }
    this.correosDts = correosValidados.correos
    
    if(!this.categoria._id){
      let loader = this.load.create({
        content: 'Cargando',
        spinner : 'circles'
      })
      loader.present()
      this.categoriaServ.crearCategoria(
        {...this.categoria, 
          'correosDelegados': this.correosDelegados,
          'correosJugadores': this.correosJugadores,
          'correosTesoreros': this.correosTesoreros,
          'correosDts': this.correosDts
        }).subscribe((resp)=>{
          loader.dismiss()
          this.utils.dispararAlert('Éxito!','Categoría creada correctamente')
          this.navCtrl.setRoot(ListaCategoriasPage)
        },
        (err)=>{
          loader.dismiss()
          this.utils.dispararAlert('Error', 'Error al crear categoría. Revise los datos o intente nuevamente')
          console.log(err)
        })
    }
  
  }

}
