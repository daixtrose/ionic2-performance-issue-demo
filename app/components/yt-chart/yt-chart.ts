import { Component, Input, OnDestroy, OnChanges, OnInit, ElementRef,
  ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/bufferTime';

// -----------------------------------------------------------------------------
export class XyPoint {
  public constructor(public x: Number, public y: Number) {
  }
}

// -----------------------------------------------------------------------------
declare var Chart: any;
declare var Color: any;

/*
  YtChart component.
*/
@Component({
  selector: 'yt-chart',
  // This is crucial: this component only listens to changes of its inputs
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'build/components/yt-chart/yt-chart.html'
})
export class YtChart implements OnDestroy, OnChanges, OnInit {
  @Input() title: String; // Text shown above the whole chart, if set to "" it won't be shown. If undefined, will be made from axis titles.
  @Input() labelXAxis: String;
  @Input() labelYAxis: String;

  @Input() values: Rx.Observable<XyPoint>;
  @Input() minY: Number;
  @Input() maxY: Number;
  @Input() fill: Boolean;

  @Input() maxNumberofSamples: Number; // Defines the maximum number of samples to display.
  @Input() color: String; // Defines the color of the line
  @Input() bgColor: String; // Defines the background color of the line

  private ctx: any;
  private chart: any = null;
  private chartUpdateTask: any;
  private valuesSubscription: Rx.Subscription;
  private updateSubscription: Rx.Subscription;
  private sampleCounterSubscription: Rx.Subscription;
  private numberOfReceivedValues: number;

  public constructor(private element: ElementRef, private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef) {

      // This AFAICS has absolutely no effect 
      //changeDetectorRef.detach();
  }

  public ngOnInit(): void {
    // console.log("-----> this.element: ", typeof (this.element), " == ", JSON.stringify(this.element));
    // console.log("-----> this.element.nativeElement.childNodes[0]: ", typeof (this.element.nativeElement.childNodes[0]));
    // console.log("-----> this.element.nativeElement.childNodes[0]: ", typeof(this.element.nativeElement.childNodes[0]))
    // console.log("-----> this.element.nativeElement.childNodes[0]: ", typeof(this.element.nativeElement.childNodes[0]))

    this.ctx = this.element.nativeElement.childNodes[0].getContext("2d");
    this.chart = new Chart(this.ctx, this.getDefaultOptions());
    

    for (let i = 0; i < this.maxNumberofSamples; i++) {
      this.addValueToChartData(new XyPoint(i, 0));
    }

    // subscribe to store all values that come in
    this.valuesSubscription = this.values
      .observeOn(Rx.Scheduler.queue)
      .subscribe(xyPoint => {
        this.addValueToChartData(xyPoint);
        
      });

    let sampleTime = 1000;

    // run an update task at a lower frequency
    this.updateSubscription = Rx.Observable.interval(sampleTime, Rx.Scheduler.async)
      .observeOn(Rx.Scheduler.queue)
      .subscribe(_ => {
        //this.zone.runOutsideAngular(() => {
            this.chart.update(0, false);
        //});
      });

    this.sampleCounterSubscription = this.values
      .observeOn(Rx.Scheduler.queue)
      .bufferTime(sampleTime)
      .subscribe(values => {
          this.numberOfReceivedValues = values.length; 
          this.changeDetectorRef.markForCheck();
        });
  }

  public ngOnChanges(): void {

  }

  addValueToChartData(dataPoint: XyPoint): void {
    //console.log("----> YT receiving value");
    if (!dataPoint) {
      return;
    }

    if (!this.chart) {
      return;
    }

    let dataPoints = this.chart.data.datasets[0].data;
    let len = dataPoints.length;

    if (len < this.maxNumberofSamples) {
      // simply append
      dataPoints.push(dataPoint);
    }
    else {
      // emulate circular buffer
      for (let i = 1; i < len; i++) {
        dataPoints[i - 1] = dataPoints[i];
      }

      dataPoints[dataPoints.length - 1] = dataPoint;

      // TODO: find a better solution for this workaround 
      // This is done due to jumping x-axis: we reset the x-Axis valus to [0, 1, ...]
      for (let i = 0; i < len; i++) {
        dataPoints[i].x = i;
      }
    }

    //this.animate();
    //this.chart.update(50, true);
  }

  public ngOnDestroy(): void {
    // terminate the update task
    clearInterval(this.chartUpdateTask);

    // unsubscribe from plot update 
    this.updateSubscription.unsubscribe(); 

    // unsubscribe from data stream
    this.valuesSubscription.unsubscribe();
    this.sampleCounterSubscription.unsubscribe();
     
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
  }


  private createDatasets(): any[] {
    let datasets = [];

    let color = Color(this.color);
    let bgColor = Color(this.bgColor);
    let dataset = {
      label: '',
      fill: false, //this.fill,
      backgroundColor: bgColor.hexString(),
      borderWith: 2,
      borderColor: color.hexString(),
      pointRadius: 0,
      xAxisID: "x-axis-id",
      yAxisID: "y-axis-id",
      lineTension: 0,
      data: []
    };

    datasets.push(dataset);


    return datasets;
  }

  private getDefaultOptions() {
    return {
      type: 'line',
      lineTension: 0,
      data: {
        datasets: this.createDatasets()
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: !!this.title,
          text: this.title
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            id: "x-axis-id",
            type: "linear",
            position: "bottom",
            gridLines: {
              display: true,
              tickMarkLength: 5
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              display: false,
              beginAtZero: false,
              mirror: false,
              padding: 5
            }
          }],
          yAxes: this.createYAxes()
        }
      }
    };
  }

  private createYAxes(): any[] {
    let yAxes = [];

    let yAxis = {
      id: "y-axis-id",
      position: "left",
      gridLines: {
        display: false,
        tickMarkLength: 2,
      },
      scaleLabel: {
        display: true,
        labelString: this.labelYAxis,
        fontColor: Color(this.color)
      },
      ticks: {
        beginAtZero: false,
        mirror: false,
        padding: 2,
        fontColor: Color(this.color),
        min: this.minY,
        max: this.maxY,
      }
    };

    yAxes.push(yAxis);

    return yAxes;
  }
}
