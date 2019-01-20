import { PlantelPage } from './../pages/plantel/plantel';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import 'firebase/messaging'; // only import firebase messaging or as needed;
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CalendarModule } from 'ionic3-calendar-en';
import { firebaseConfig } from '../enviroment';
import { AltaConceptosDeCajaPage } from '../pages/Backoffice/alta-conceptos-de-caja/alta-conceptos-de-caja';
import { ConceptosDeCajaPage } from '../pages/Backoffice/conceptos-de-caja/conceptos-de-caja';
import { MantenimientoFechaPage } from '../pages/Backoffice/mantenimiento-fecha/mantenimiento-fecha';
import { MantenimientoCampeonatosPage } from '../pages/common/mantenimiento-campeonatos/mantenimiento-campeonatos';
import { DatosDeportivosListaPage } from '../pages/datos-deportivos-lista/datos-deportivos-lista';
import { DetalleFechaPage } from '../pages/detalle-fecha/detalle-fecha';
import { DetallesEventoPage } from '../pages/detalles-evento/detalles-evento';
import { HomePage } from '../pages/home/home';
import { ListaCategoriasPage } from '../pages/lista-categorias/lista-categorias';
import { ListaEventosPage } from '../pages/lista-eventos/lista-eventos';
import { ModificacionPeriflesPage } from '../pages/modificacion-perifles/modificacion-perifles';
import { PlaceHolderPage } from '../pages/place-holder/place-holder';
import { EventoService } from '../providers/evento.service';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging';
import { UtilsServiceProvider } from '../providers/utils.service';
import { TouchedWorkaroundDirective } from './../directives/touched-workaround.directive';
import { MantenimientoTipoEventosPage } from './../pages/Backoffice/mantenimiento-tipo-eventos/mantenimiento-tipo-eventos';
import { TipoEventosPage } from './../pages/Backoffice/tipo-eventos/tipo-eventos';
import { AltaDeUsuarioPage } from './../pages/common/alta-usuario/alta-de-usuario';
import { ListaCampeonatosPage } from './../pages/common/lista-campeonatos/lista-campeonatos';
import { LoginPage } from './../pages/common/login/login';
import { ConsultaModificacionDatosPage } from './../pages/consulta-modificacion-datos/consulta-modificacion-datos';
import { DetalleComentarioPage } from './../pages/detalle-comentario/detalle-comentario';
import { ListaRegistroEventoPage } from './../pages/lista-registro-evento/lista-registro-evento';
import { MantenimientoCategoriaPage } from './../pages/mantenimiento-categoria/mantenimiento-categoria';
import { ModificacionDatosPage } from './../pages/modificacion-datos/modificacion-datos';
import { ModificarComentarioPage } from './../pages/modificar-comentario/modificar-comentario';
import { ModificarEventoPage } from './../pages/modificar-evento/modificar-evento';
import { ModificarPasswordPage } from './../pages/modificar-password/modificar-password';
import { UsuariosEnCategoriaPage } from './../pages/usuarios-en-categoria/usuarios-en-categoria';
import { CampeonatoService } from './../providers/campeonato.service';
import { CategoriaService } from './../providers/categoria.service';
import { ConceptoService } from './../providers/concepto.service';
import { MenuService } from './../providers/menu.service';
import { TipoEventoService } from './../providers/tipoevento.service';
import { UsuarioService } from './../providers/usuario.service';
import { MyApp } from './app.component';





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
    ListaRegistroEventoPage,
    ModificarComentarioPage,
    DatosDeportivosListaPage,
    DetalleComentarioPage,
    PlantelPage
    

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
    ListaRegistroEventoPage,
    ModificarComentarioPage,
    DatosDeportivosListaPage,
    DetalleComentarioPage,
    PlantelPage
    
    
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
    MenuService,
    CampeonatoService,
    EventoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
