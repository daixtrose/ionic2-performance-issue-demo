import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Content} from 'ionic-angular';
import * as Rx from 'rxjs';
import { Platform } from 'ionic-angular';

import { Gauge } from '../../components/gauge/gauge';
import { YtChart, XyPoint } from '../../components/yt-chart/yt-chart';

@Component({
  templateUrl: 'build/pages/general-info-page/general-info-page.html',
  directives: [
    Gauge, 
    YtChart
    ]
})
export class GeneralInfoPage implements OnInit {
  private someNumbers : Rx.Observable<XyPoint>;
  private showYtPlot: boolean;
  private showGauges: boolean;
  constructor(private navController: NavController) {
    this.someNumbers = Rx.Observable.interval(10, Rx.Scheduler.async)
      .map(counter => new XyPoint(this.getCSharpTicks(), this.generateSinusNumber(counter) * 5.0 + 5.0));
  }

  public ngOnInit(): void {
    this.showYtPlot = true;
  }

  generateSinusNumber(counter): number {
      return Math.sin(counter / 60.0);
  }

  // generate CShart compatiböle DateTime ticks
  private getCSharpTicks(date?: Date): number {
    date = date || new Date();
    return (date.getTime() * 10000) + 621355968000000000;
  }
}

