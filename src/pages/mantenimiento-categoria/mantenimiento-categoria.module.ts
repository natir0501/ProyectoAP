import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MantenimientoCategoriaPage } from './mantenimiento-categoria';

@NgModule({
  declarations: [
    MantenimientoCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(MantenimientoCategoriaPage),
  ],
})
export class MantenimientoCategoriaPageModule {}
