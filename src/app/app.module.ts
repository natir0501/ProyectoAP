import { RegistroPagoCuotaPage } from './../pages/registro-pago-cuota/registro-pago-cuota';
import { CuentaService } from './../providers/cuenta.service';
import { UsuariosEnCategoriaPage } from './../pages/usuarios-en-categoria/usuarios-en-categoria';
import { MenuService } from './../providers/menu.service';
import { MantenimientoTipoEventosPage } from './../pages/Backoffice/mantenimiento-tipo-eventos/mantenimiento-tipo-eventos';
import { MantenimientoCategoriaPage } from './../pages/Backoffice/mantenimiento-categoria/mantenimiento-categoria';
import { TipoEventosPage } from './../pages/Backoffice/tipo-eventos/tipo-eventos';
import { TipoEventoService } from './../providers/tipoevento.service';
import { ConceptoService } from './../providers/concepto.service';
import { AltaConceptosDeCajaPage } from '../pages/Backoffice/alta-conceptos-de-caja/alta-conceptos-de-caja';
import { CategoriaService } from './../providers/categoria.service';
import { AltaDeUsuarioPage } from './../pages/Backoffice/alta-usuario/alta-de-usuario';
import { TouchedWorkaroundDirective } from './../directives/touched-workaround.directive';
import { UsuarioService } from './../providers/usuario.service';
import { LoginPage } from './../pages/common/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ConsultaModificacionDatosPage } from './../pages/consulta-modificacion-datos/consulta-modificacion-datos';
import { ModificacionDatosPage } from './../pages/modificacion-datos/modificacion-datos';
import { CampeonatoService } from './../providers/campeonato.service';
import { ListaCampeonatosPage } from './../pages/common/lista-campeonatos/lista-campeonatos';
import { ModificarEventoPage } from './../pages/modificar-evento/modificar-evento';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { CalendarModule } from 'ionic3-calendar-en';
import 'firebase/messaging'; // only import firebase messaging or as needed;
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { firebaseConfig } from '../enviroment';
import { ConceptosDeCajaPage } from '../pages/Backoffice/conceptos-de-caja/conceptos-de-caja';
import { ListaCategoriasPage } from '../pages/lista-categorias/lista-categorias';
import { SaldoMovimientosCategoriaPage } from '../pages/Contabilidad/saldo-movimientos-categoria/saldo-movimientos-categoria';
import { PlaceHolderPage } from '../pages/place-holder/place-holder';
import { RegistroMovCajaPage } from '../pages/Contabilidad/registro-mov-caja/registro-mov-caja';
import { ModificacionPeriflesPage } from '../pages/modificacion-perifles/modificacion-perifles';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging';
import { UtilsServiceProvider } from '../providers/utils.service';
import { ModificarPasswordPage } from './../pages/modificar-password/modificar-password';
import { MantenimientoCampeonatosPage } from '../pages/common/mantenimiento-campeonatos/mantenimiento-campeonatos';
import { MantenimientoFechaPage } from '../pages/Backoffice/mantenimiento-fecha/mantenimiento-fecha';
import { ListaEventosPage } from '../pages/lista-eventos/lista-eventos';
import { EventoService } from '../providers/evento.service';
import { DetallesEventoPage } from '../pages/detalles-evento/detalles-evento';
import { DetalleFechaPage } from '../pages/detalle-fecha/detalle-fecha';





@NgModule({
  declarations: [
    MyApp,
    PlaceHolderPage,
    HomePage,
    LoginPage,
    AltaDeUsuarioPage,
    TouchedWorkaroundDirective,
    MantenimientoCategoriaPage,
    AltaConceptosDeCajaPage,
    ConceptosDeCajaPage,
    TipoEventosPage,
    TouchedWorkaroundDirective,
    ListaCategoriasPage,
    MantenimientoTipoEventosPage,
    SaldoMovimientosCategoriaPage,
    RegistroMovCajaPage,
    UsuariosEnCategoriaPage,
    ModificacionPeriflesPage,
    ModificarPasswordPage,
    ListaCampeonatosPage,
    MantenimientoCampeonatosPage,
    MantenimientoFechaPage,
    ListaEventosPage,
    ModificarEventoPage,
    DetallesEventoPage,
    DetalleFechaPage,
    ModificacionDatosPage,
    ConsultaModificacionDatosPage,
    RegistroPagoCuotaPage
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      backButtonText: ''
    }),
    CalendarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlaceHolderPage,
    AltaDeUsuarioPage,
    LoginPage,
    MantenimientoCategoriaPage,
    ConceptosDeCajaPage,
    AltaConceptosDeCajaPage,
    TipoEventosPage,
    ListaCategoriasPage,
    MantenimientoTipoEventosPage,
    SaldoMovimientosCategoriaPage,
    RegistroMovCajaPage,
    UsuariosEnCategoriaPage,
    ModificacionPeriflesPage,
    ModificarPasswordPage,
    ListaCampeonatosPage,
    MantenimientoCampeonatosPage,
    MantenimientoFechaPage,
    ListaEventosPage,
    ModificarEventoPage,
    DetallesEventoPage,
    DetalleFechaPage,
    ModificacionDatosPage,
    ConsultaModificacionDatosPage,
    RegistroPagoCuotaPage
    
    
    
  ],
  providers: [
    FirebaseMessagingProvider,
    UsuarioService,
    CategoriaService,
    ConceptoService,
    StatusBar,
    SplashScreen,
    UtilsServiceProvider,
    TipoEventoService,
    CuentaService,
    MenuService,
    CampeonatoService,
    EventoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
