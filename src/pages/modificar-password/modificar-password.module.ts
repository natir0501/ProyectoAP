import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarPasswordPage } from './modificar-password';

@NgModule({
  declarations: [
    ModificarPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarPasswordPage),
  ],
})
export class ModificarPasswordPageModule {}
