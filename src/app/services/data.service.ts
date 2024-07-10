import {Injectable} from '@angular/core';
import {Instrument, InstrumentsModel} from "../models/instuments.model";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "./http.service";
import {BarModel} from "../models/bars.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public instruments: InstrumentsModel;
  public bars: BarModel[] | null = null;
  public instrumentControl = this.fb.control<Instrument | null>(null);

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder) {
  }

  public fetchInstruments(): void {
    this.httpService.getInstruments().subscribe(this.setInstruments.bind(this))
  }


  private setInstruments(instruments: InstrumentsModel): void {
    if (instruments) {
      this.instruments = instruments;
    }
  }
}
