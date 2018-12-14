import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroMovCajaPage } from './registro-mov-caja';

@NgModule({
  declarations: [
    RegistroMovCajaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroMovCajaPage),
  ],
})
export class RegistroMovCajaPageModule {}
