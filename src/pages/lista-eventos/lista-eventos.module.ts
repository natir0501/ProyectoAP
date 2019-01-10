import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaEventosPage } from './lista-eventos';
import { CalendarModule } from 'ionic3-calendar-en';

@NgModule({
  declarations: [
    ListaEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaEventosPage),
    CalendarModule
  ],
})
export class ListaEventosPageModule {}
