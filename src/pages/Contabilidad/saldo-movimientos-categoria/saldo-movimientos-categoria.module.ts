import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaldoMovimientosCategoriaPage } from './saldo-movimientos-categoria';

@NgModule({
  declarations: [
    SaldoMovimientosCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(SaldoMovimientosCategoriaPage),
  ],
})
export class SaldoMovimientosCategoriaPageModule {}
