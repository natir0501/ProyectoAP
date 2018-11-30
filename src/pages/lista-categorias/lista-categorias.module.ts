import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCategoriasPage } from './lista-categorias';

@NgModule({
  declarations: [
    ListaCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCategoriasPage),
  ],
})
export class ListaCategoriasPageModule {}
