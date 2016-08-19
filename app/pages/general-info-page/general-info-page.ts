import {Component, ViewChild, OnInit, OnChanges, AfterViewInit, SimpleChanges, 
  ChangeDetectorRef, NgZone, ChangeDetectionStrategy} from '@angular/core';
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
export class GeneralInfoPage implements OnInit, OnChanges, AfterViewInit {
  private someNumbers : Rx.Observable<XyPoint>;
  private showYtPlot: boolean = false;
  private showGauges: boolean = false;
  
  constructor(
    private navController: NavController, 
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone) {
    this.someNumbers = Rx.Observable.interval(10, Rx.Scheduler.async)
      .map(counter => new XyPoint(this.getCSharpTicks(), this.generateSinusNumber(counter) * 5.0 + 5.0));
  }

  public ngOnInit(): void {
      
  }

  public ngAfterViewInit(): void {
    this.showYtPlot = true;
  } 

  ngOnChanges(changes: SimpleChanges) {
    
  }

  generateSinusNumber(counter): number {
      //console.log("YT Data: generating value");
      return Math.sin(counter / 60.0);
  }

  // generate CShart compatiböle DateTime ticks
  private getCSharpTicks(date?: Date): number {
    date = date || new Date();
    return (date.getTime() * 10000) + 621355968000000000;
  }
}

