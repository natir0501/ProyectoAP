import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallesEventoPage } from './detalles-evento';

@NgModule({
  declarations: [
    DetallesEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallesEventoPage),
  ],
})
export class DetallesEventoPageModule {}
