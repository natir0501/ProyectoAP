import { UsuarioService } from './../providers/usuario.service';
import { Usuario } from './../models/usuario.model';
import { CEILOGO } from './../providers/constant';
import { MantenimientoCategoriaPage } from './../pages/mantenimiento-categoria/mantenimiento-categoria';
import { AltaDeUsuarioPage } from './../pages/common/alta-usuario/alta-de-usuario';
import { UtilsServiceProvider } from './../providers/utils.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging';
import { LoginPage } from '../pages/common/login/login';
import { GENERIC, AVATAR } from '../providers/constant';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  pages: any;
  shownGroup: any;
  
  avatar: string = CEILOGO;
  usuario: Usuario = new Usuario()
  @ViewChild(Nav) nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public usuarioServ: UsuarioService,
    fcmService: FirebaseMessagingProvider, private http: HttpClient, private menu: MenuController, private utils: UtilsServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.http.get('../assets/ambiente.json').subscribe((res: any) => {
        if (res.env === 'dev') {
          this.utils.apiUrl = 'http://localhost:3000/'
          this.usuarioServ.apiUrl=this.utils.apiUrl
        }
        this.usuarioServ.getActualUser().then((resp : any)=>{
          this.usuario = resp.usuario
          
        })
      })

    });
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
    this.pages = [

      {
        title: 'Jugador', icon: 'football', right_icon: 'add',
        sub: [
          { sub_title: 'Alta de usuario', component: AltaDeUsuarioPage },
          { sub_title: 'Cateogorías', component: MantenimientoCategoriaPage, badge_value: '9' }

        ]
      },
      {
        title: 'Delegado', icon: 'clipboard', right_icon: 'add',
        sub: [
          { sub_title: 'Alta de usuario', component: AltaDeUsuarioPage },
          { sub_title: 'Mant. de Categorías', component: MantenimientoCategoriaPage, badge_value: '9' }

        ]
      },
      {
        title: 'Tesorero', icon: 'cash', right_icon: 'add',
        sub: [
          { sub_title: 'Alta de usuario', component: AltaDeUsuarioPage },
          { sub_title: 'Mant. de Categorías', component: MantenimientoCategoriaPage, badge_value: '9' }

        ]
      },
      {
        title: 'Director Técnico', icon: 'person', right_icon: 'add',
        sub: [
          { sub_title: 'Alta de usuario', component: AltaDeUsuarioPage },
          { sub_title: 'Mantenimiento de Cateogorías', component: MantenimientoCategoriaPage, badge_value: '9' }

        ]
      }


    ];
  }

  ionViewDidLoad() {
   
  }

  showChild(page) {
    if (this.isSubmenuShown(page)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = page;
    }
  }

  isSubmenuShown(page) {
    return this.shownGroup === page;
  }

  openPage(page) {
    if (!(page.component)) {
      this.showChild(page);
    } else {
      this.shownGroup = null;
      this.nav.setRoot(page.component);
      this.menu.close();
    }
  }

  home(){
    this.nav.setRoot(HomePage)
    this.menu.close();
  }

  logout() {
    
    this.usuarioServ.logOut();
    
    this.nav.setRoot(LoginPage)
    this.menu.close()
  }
}

