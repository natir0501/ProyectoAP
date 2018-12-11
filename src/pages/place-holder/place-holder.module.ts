import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceHolderPage } from './place-holder';

@NgModule({
  declarations: [
    PlaceHolderPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceHolderPage),
  ],
})
export class PlaceHolderPageModule {}
