import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';

/*
  A simple data service providing some observables which feed numbers
*/
@Injectable()
export class DataService {
  public someNumbersFromZeroToOne : Rx.Observable<number>;

  constructor() {
    this.someNumbersFromZeroToOne = 
      Rx.Observable.interval(10, Rx.Scheduler.async)
        .map(counter => this.generateSinusNumber(counter));
  }

  generateSinusNumber(counter): number {
      return Math.sin(counter / 60.0) * 0.5 + 0.5;
  }
}

