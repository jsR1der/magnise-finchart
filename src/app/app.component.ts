import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SelectComponent} from "./components/select/select.component";
import {ButtonComponent} from "./components/button/button.component";
import {DataService} from "./services/data.service";
import {WssServiceService} from "./services/wss-service.service";
import {HttpService} from "./services/http.service";
import {DatePipe, NgIf} from "@angular/common";
import {HistoricalChartComponent} from "./components/historical-chart/historical-chart.component";
import {HistoricalChartService} from "./components/historical-chart/historical-chart.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectComponent, ButtonComponent, NgIf, DatePipe, HistoricalChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(public selectSectionService: DataService,
              public wssService: WssServiceService,
              public historicalChartService: HistoricalChartService,
              public httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getToken().pipe().subscribe(token => {
        this.httpService.token = token;
        this.selectSectionService.fetchInstruments()
        this.wssService.createSocket();
        this.wssService.listenSocketEvents();
      }
    )

  }

  public subscribeToInstrument() {
    this.selectSectionService.bars = null;
    this.historicalChartService.chart = null;
    this.populateChart()
    if (this.wssService.selectedInstrument) {
      this.wssService.subscribeToResponse(false);
      this.wssService.selectedInstrument = null;
      this.wssService.subscribeToResponse(true, this.selectSectionService.instrumentControl.value?.id)
      return;
    }
    this.wssService.subscribeToResponse(true, this.selectSectionService.instrumentControl.value?.id)
  }

  private populateChart(): void {
    const selectedInstrumentId = this.selectSectionService.instrumentControl?.value?.id
    if (selectedInstrumentId) {
      this.httpService.getBars(selectedInstrumentId)
        .subscribe(response => this.selectSectionService.bars = response.data)
    }
  }
}
