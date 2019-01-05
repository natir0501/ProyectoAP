import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCampeonatosPage } from './lista-campeonatos';

@NgModule({
  declarations: [
    ListaCampeonatosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCampeonatosPage),
  ],
})
export class ListaCampeonatosPageModule {}
