import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarEventoPage } from './modificar-evento';

@NgModule({
  declarations: [
    ModificarEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarEventoPage),
  ],
})
export class ModificarEventoPageModule {}
