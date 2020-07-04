import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nav: NavController
  ) {
    this.initializeApp();
  }
  /* clickItem() {
    console.log('hi from item Menu')
    this.nav.navigateForward('/menu')
  } */

  goToConfigPage(){
    this.nav.navigateForward('/menu')
  }

  goToLoginPage(){
    this.nav.navigateForward('/loggin')
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
