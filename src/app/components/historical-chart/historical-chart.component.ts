import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";
import {DataService} from "../../services/data.service";
import {ChartBar} from "../../models/bars.model";
import {HistoricalChartService} from "./historical-chart.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-historical-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.scss'
})
export class HistoricalChartComponent implements AfterViewInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: ChartOptions;


  ngAfterViewInit() {
    this.historicalService.chart = this.chart
  }

  constructor(private selectSectionService: DataService,
              private historicalService: HistoricalChartService) {
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.mapBarsData(),
        }
      ],
      chart: {
        toolbar: {
          autoSelected: 'zoom',
          show: true,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            selection: true,
          }
        },
        type: "candlestick",
        height: "700",
        width: window.innerWidth - 32
      },
      title: {
        text: "CandleStick Chart",
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
  }

  private mapBarsData(): ChartBar[] {
    return this.selectSectionService.bars!.map(bar => new ChartBar(bar))
  }

  public generateDayWiseTimeSeries(baseval: any, count, yrange) {
    let i = 0;
    const series: any[] = [];
    while (i < count) {
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
