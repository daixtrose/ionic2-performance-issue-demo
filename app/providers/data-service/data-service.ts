import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';

/*
  A simple data service providing some observables which feed numbers
*/
@Injectable()
export class DataService {
  private subject: Rx.Subject<number>;
  private subscription: Rx.Subscription;

  constructor() {
    this.subject = new Rx.Subject<number>();

    this.subscription = Rx.Observable.interval(10, Rx.Scheduler.async)
      .map(counter => this.generateSinusNumber(counter))
      .subscribe(value => this.subject.next(value));
  }

  public setUpdateInterval(updateRate: number): void {
    if (updateRate < 1)
    {
      return;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = Rx.Observable.interval(updateRate, Rx.Scheduler.async)
      .map(counter => this.generateSinusNumber(counter))
      .subscribe(value => this.subject.next(value));

  }

  public get someNumbersFromZeroToOne(): Rx.Observable<number> {
    return this.subject.asObservable();
  }


  generateSinusNumber(counter): number {
    return Math.sin(counter / 60.0) * 0.5 + 0.5;
  }
}

