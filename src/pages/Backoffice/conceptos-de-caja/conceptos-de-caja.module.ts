import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConceptosDeCajaPage } from './conceptos-de-caja';

@NgModule({
  declarations: [
    ConceptosDeCajaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConceptosDeCajaPage),
  ],
})
export class ConceptosDeCajaPageModule {}
