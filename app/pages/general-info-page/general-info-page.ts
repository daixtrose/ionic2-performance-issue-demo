import {Component, ViewChild, OnInit, OnDestroy, OnChanges, AfterViewInit, SimpleChanges,
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
export class GeneralInfoPage implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  private someNumbers: Rx.Observable<XyPoint>;
  private showYtPlot: boolean = false;
  private showGauges: boolean = false;
  private subject: Rx.Subject<XyPoint>;
  private updateInterval: number = 10;
  private subscription: Rx.Subscription;

  constructor(
    private navController: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone) {
    this.subject = new Rx.Subject<XyPoint>();
    this.someNumbers = this.subject.asObservable();
  }

  public ngOnInit(): void {
    this.startSendingDataAtRate(this.updateInterval);
  }

  private startSendingDataAtRate(changedUpdateInterval: number): void {
    this.subscription = Rx.Observable.interval(changedUpdateInterval, Rx.Scheduler.async)
      .map(counter => new XyPoint(this.getCSharpTicks(), this.generateSinusNumber(counter) * 5.0 + 5.0))
      .subscribe(xy => this.subject.next(xy));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public ngAfterViewInit(): void {
    this.showYtPlot = true;
  }

  public updateIntervalChanged()
  {
    console.log("---> Bingo ", this.updateInterval);
  }

  public onChangeUpdateInterval(updateInterval: number)
  {
      console.log("---> onChangeUpdateInterval");
      console.log(updateInterval);

      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.startSendingDataAtRate(updateInterval);
  }

  // There seems to be a bug and this is not called - ???  
  public ngOnChanges(changes: SimpleChanges): void {
    console.log("---> ngOnChanges");
    
    let changedUpdateInterval = changes['updateInterval'];

    if (changedUpdateInterval) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.startSendingDataAtRate(changedUpdateInterval.currentValue);
    }
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

