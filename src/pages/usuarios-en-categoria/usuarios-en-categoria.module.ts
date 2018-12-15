import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosEnCategoriaPage } from './usuarios-en-categoria';

@NgModule({
  declarations: [
    UsuariosEnCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuariosEnCategoriaPage),
  ],
})
export class UsuariosEnCategoriaPageModule {}
