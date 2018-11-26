import { ConceptoService } from './../providers/concepto.service';
import { AltaConceptosDeCajaPage } from '../pages/Backoffice/alta-conceptos-de-caja/alta-conceptos-de-caja';
import { CategoriaService } from './../providers/categoria.service';
import { AltaDeUsuarioPage } from './../pages/common/alta-usuario/alta-de-usuario';
import { TouchedWorkaroundDirective } from './../directives/touched-workaround.directive';
import { UsuarioService } from './../providers/usuario.service';
import { LoginPage } from './../pages/common/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import 'firebase/messaging'; // only import firebase messaging or as needed;
import { firebaseConfig } from '../enviroment'
import { FirebaseMessagingProvider } from '../providers/firebase-messaging';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http' 
import { UtilsServiceProvider } from '../providers/utils.service';
import { ConceptosDeCajaPage } from '../pages/Backoffice/conceptos-de-caja/conceptos-de-caja';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AltaDeUsuarioPage,
    AltaConceptosDeCajaPage,
    ConceptosDeCajaPage,
    TouchedWorkaroundDirective

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AltaDeUsuarioPage,
    LoginPage,
    ConceptosDeCajaPage,
    AltaConceptosDeCajaPage
  ],
  providers: [
    FirebaseMessagingProvider,
    UsuarioService,
    CategoriaService,
    ConceptoService,
    StatusBar,
    SplashScreen,
    UtilsServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
