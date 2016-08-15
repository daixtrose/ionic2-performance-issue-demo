import { Component, Input, ElementRef, NgZone,
  OnInit, OnDestroy, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {Observable, Subscription, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/sample';

import { DataService } from '../../providers/data-service/data-service';

// Still searching for a d.ts file ....
declare var JustGage: any;

// A 180 degree gauge, which can handle color palettes to better visualize the current value. 
@Component({
  selector: 'gauge',
  templateUrl: 'build/components/gauge/gauge.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Gauge implements OnInit, OnDestroy, OnChanges {
  @Input() title: string;
  @Input('min') minInput: string = '0';
  @Input('max') maxInput: string = '1';
  @Input() noSpaceBetweenValueAndUnit: Boolean;
  @Input() colors: string[] = ['black', 'black'];

  private min: number = 0;
  private max: number = 1;
  private justGage: any;
  private chartUpdateTask: any;
  private currentValue: number = 0.0;
  private subscription: Subscription;

  constructor(
    private element: ElementRef,
    private dataService: DataService,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    console.log(this.getDefaultOptions());
    this.justGage = new JustGage(this.getDefaultOptions());
    this.justGage.config.levelColors = this.colors;

    //////////////////////////////////////////////////////////////////////////////////////////
    // !!! Here are the dragons !!!!
    //////////////////////////////////////////////////////////////////////////////////////////
    
    let observableValue = this.dataService.someNumbersFromZeroToOne
      .sample(Observable.interval(250)) // reduce frequency
      .map((value, index) => value * (this.max - this.min) + this.min)
      ;


    this.subscription = observableValue.subscribe(value => {
      this.ngZone.runOutsideAngular(() => {
        this.currentValue = parseFloat(value.toFixed(2));
        //console.log("-----> refreshing gauge with:", this.currentValue);

        // ---> This refresh is immediate  
        this.justGage.refresh(this.currentValue);
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  public ngOnDestroy(): void {
    this.clearSubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let changedColors = changes['colors'];

    if (changedColors) {
      //console.log("COLORS")
      if (this.justGage) this.justGage.config.levelColors = this.colors;
    }

    
    this.min = parseInt(this.minInput, 10);
    this.max = parseInt(this.maxInput, 10);

    console.log("setting min/max to ", this.min, "/", this.max);
    if (this.justGage) { 
      this.justGage.config.min = this.min;
      this.justGage.config.max = this.max;
    }
  }

  private clearSubscription(): void {
    console.log("-----> clearing subscription");

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private getColorTable(): string[] {
    return this.colors ? this.colors : ["#a9d70b", "#f9c802", "#ff0000"];
  }

  private getDefaultOptions() {
    return {
      value: this.min,
      defaults: false,
      parentNode: this.element.nativeElement.childNodes[0],
      width: null,
      height: null,
      title: this.title,
      titleFontColor: "#999999",
      titleFontFamily: "sans-serif",
      titlePosition: "above", // "below"
      valueFontColor: "#010101",
      valueFontFamily: "Arial",
      symbol: '',
      min: this.min,
      minTxt: false,
      max: this.max,
      maxTxt: false,
      reverse: false,
      // number of decimal places for our human friendly number to contain
      humanFriendlyDecimal: 0,
      textRenderer: null, // (text) => text;
      onAnimationEnd: null, // () => {};
      gaugeWidthScale: 1,
      gaugeColor: "#edebeb",
      label: "",
      labelFontColor: "#b3b3b3",
      shadowOpacity: 0.2,
      shadowSize: 5,
      shadowVerticalOffset: 3,
      levelColors: this.getColorTable(),
      startAnimationTime: 250, // 700
      // type of initial animation (linear, >, <,  <>, bounce)
      startAnimationType: '>',
      refreshAnimationTime: 700, // 700
      refreshAnimationType: '>',
      donutStartAngle: 90,
      valueMinFontSize: 10,
      titleMinFontSize: 10,
      labelMinFontSize: 10,
      minLabelMinFontSize: 10,
      maxLabelMinFontSize: 10,
      hideValue: false,
      hideMinMax: false,
      hideInnerShadow: false,
      humanFriendly: false,
      noGradient: false,
      donut: false,
      relativeGaugeSize: false,
      counter: true,
      decimals: true,
      customSectors: [], // [{color: "#333", lo: 0, hi: 100}, ...]
      formatNumber: false,
      pointer: false,
      pointerOptions: {}, // {toplength: -15, bottomlength: 10, bottomwidth: 12, color: '#8e8e93', stroke: '#ffffff', stroke_width: 3, stroke_linecap: 'round'}
    };
  }
}
