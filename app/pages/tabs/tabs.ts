import {Component} from '@angular/core'
import {AboutPage} from '../about-page/about-page';
import {GeneralInfoPage} from '../general-info-page/general-info-page';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  tabs: any[] =
  [
    { title: "General Information", root: GeneralInfoPage, icon: "information-circle" },
    { title: "About", root: AboutPage, icon: "color-fill" }
  ];

  constructor() {
  }
}
