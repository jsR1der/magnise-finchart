import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {InstrumentsModel} from "../models/instuments.model";
import {BarModel} from "../models/bars.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  accessor token: string;

  constructor(private http: HttpClient) {
  }

  public getToken(): Observable<string> {
    if (this.token) {
      return of(this.token);
    }
    return this.http.get<string>(`http://localhost:3000/token`).pipe(catchError(e => {
      return of('')
    }));
  }

  public getInstruments(): Observable<InstrumentsModel> {
    return this.http.get<InstrumentsModel>(`http://localhost:3000/instruments`)
  }


  public getBars(instrumentId: string): Observable<{ data: BarModel[] }> {
    const barsCount = this.getRandomInt(50, 100);
    return this.http.get<{
      data: BarModel[]
    }>(`https://platform.fintacharts.com/api/bars/v1/bars/count-back?instrumentId=${instrumentId}&provider=oanda&interval=1&periodicity=minute&barsCount=${barsCount}`, {
      headers: {'Authorization': `Bearer ${this.token}`}
    })
  }

  public getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
