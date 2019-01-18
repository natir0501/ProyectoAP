import { Categoria } from './../models/categoria.models';
import { MenuService } from './../providers/menu.service';
//import { Pantallas } from './../config/pantallas';
import { PlaceHolderPage } from './../pages/place-holder/place-holder';
import { ListaCategoriasPage } from './../pages/lista-categorias/lista-categorias';
import { AppModule } from './app.module';
import { UsuarioService } from './../providers/usuario.service';
import { Usuario } from './../models/usuario.model';
import { CEILOGO } from './../providers/constant';
import { MantenimientoCategoriaPage } from './../pages/Backoffice/mantenimiento-categoria/mantenimiento-categoria';
import { AltaDeUsuarioPage } from './../pages/Backoffice/alta-usuario/alta-de-usuario';
import { UtilsServiceProvider } from './../providers/utils.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MenuController, Nav, NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../pages/common/login/login';
import { HomePage } from '../pages/home/home';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  usuario: Usuario
  rootPage: any = HomePage;
  nombreCategoria : string = ''
  pages: any = [];
  shownGroup: any;
  mostrar: boolean = false;

  avatar: string = CEILOGO;

  roles: string[] = []
  @ViewChild(Nav) nav: NavController;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public usuarioServ: UsuarioService, public menuServ: MenuService,
    private fcmService: FirebaseMessagingProvider, private http: HttpClient, private menu: MenuController, private utils: UtilsServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();

      if (window.location.host === 'localhost:8100') {
        this.utils.apiUrl = 'http://localhost:3000/'
        this.usuarioServ.apiUrl = this.utils.apiUrl
      }
    });

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

  async ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    let registro: boolean = window.location.hash.split('/').indexOf('registro') > 0
    if (!registro) {


      this.usuarioServ.usuConectado.subscribe(async (usu: Usuario) => {
        
        if (usu) {
          
          if (this.usuarioServ.usuario && this.fcmService.token) {
            if (this.platform.platforms().indexOf('mobile') >= 0) {
              this.usuarioServ.registrarPush({ platform: 'mobile', token: this.fcmService.token }).subscribe((resp)=>{
         
              },(error)=>{
                console.log(error)
              })
            }
            else{
              this.usuarioServ.registrarPush({ platform: 'desktop', token: this.fcmService.token }).subscribe((resp)=>{
            
              },(error)=>{
                console.log(error)
              })
            }
          }
         

          this.usuario = usu
          if (this.usuario.perfiles.length === 0) {
            this.roles = ['Delegado Institucional']
            this.pages = await this.menuServ.menuDelegadoInstitucional(this.usuario)
           

            

          }
          else {
            if (this.usuario.perfiles.length === 1) {
             
              let resp = await this.usuarioServ.getRoles(this.usuario.perfiles[0].roles).toPromise()

              this.roles = resp.data.nombreRoles 
           
              let menu = await this.menuServ.getMenu(this.usuario.perfiles[0].roles)
              if(this.menuServ.categoriasUsuario.length>1){
                menu = [
                  ...menu,
                  await this.menuServ.switchCategoríaInterno()
                ]
              }
              this.pages = menu
              this.nombreCategoria = await this.menuServ.nombreCategoria(this.usuario.perfiles[0].categoria)
              

            } else {
              this.roles = ['Seleccione categoría']
              this.pages = [await this.menuServ.switchCategoría(this.usuario)]
            }

          }

        } else {
          this.pages = []
          return this.nav.setRoot(LoginPage)
        }

      })

      await this.usuarioServ.recuperoUsuario()


    }
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
      if(page.component.categoria){
       
       this.menuServ.cambioCategoria(page.component.categoria).then(()=>{
        
         this.shownGroup = null;
         this.menu.close();
         
       }).catch(()=>{
         
       })
       return 
      }
      this.shownGroup = null;
      this.nav.setRoot(page.component);
      this.menu.close();
    }
  }

  home() {
    this.nav.setRoot(HomePage)
    this.menu.close();
  }

  logout() {

    this.usuarioServ.logOut();
    this.usuario = undefined
    this.roles = []
    this.menuServ.categoriaSeleccionada = undefined
    this.menuServ.categoriasUsuario = []
    this.menuServ.perfilesUsuario = []
    this.nav.setRoot(LoginPage)
    this.menu.close()
    this.nombreCategoria = ''
  }
}

