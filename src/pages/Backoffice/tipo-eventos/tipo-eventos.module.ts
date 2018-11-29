import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoEventosPage } from './tipo-eventos';

@NgModule({
  declarations: [
    TipoEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoEventosPage),
  ],
})
export class TipoEventosPageModule {}
