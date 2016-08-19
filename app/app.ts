import {Component, ViewChild, enableProdMode} from '@angular/core';

import {Platform, Nav, Menu, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Alert, NavController} from 'ionic-angular';

import {TabsPage} from './pages/tabs/tabs';
import {GeneralInfoPage} from './pages/general-info-page/general-info-page'
import {AboutPage} from './pages/about-page/about-page';

import { DataService } from './providers/data-service/data-service';

@Component({
  //  template: '<ion-nav [root]="rootPage"></ion-nav>'
  templateUrl: 'build/app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) menu: Menu;

  rootPage: any = TabsPage;
  pages: any[] = [
    { title: 'General Info', component: GeneralInfoPage },
  ];

  additional_pages: any[] = [
    { title: 'About', component: AboutPage },
  ];

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  switchToTabView() {
    this.menu.close();
    this.nav.setRoot(TabsPage);
  }

  doAlert() {
    this.menu.close();
    let alert = Alert.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }
}

enableProdMode();
ionicBootstrap(MyApp, [DataService])

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule }              from './app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule);