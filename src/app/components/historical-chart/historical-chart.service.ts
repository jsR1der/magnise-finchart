import { Injectable } from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

@Injectable({
  providedIn: 'root'
})
export class HistoricalChartService {
  public chart: ChartComponent | null;
  constructor() { }
}
