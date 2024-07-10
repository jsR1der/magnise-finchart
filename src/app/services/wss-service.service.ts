import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {SubscriptionPayload, SubscriptionResponse} from "../models/instuments.model";
import {fromEvent, Subscription} from "rxjs";
import {SelectedInstrumentAdapter} from "../models/wss.model";

@Injectable({
  providedIn: 'root'
})
export class WssServiceService {
  protected readonly BASE_URL = 'wss://platform.fintacharts.com'
  accessor webSocket: WebSocket;
  public selectedInstrument: SelectedInstrumentAdapter | null;
  public websocketEvents: Record<string, Subscription> = {};
  public defaultPayload: SubscriptionPayload = new SubscriptionPayload('l1-subscription', 'ad9e5345-4c3b-41fc-9437-1d253f62db52', 'simulation', true)


  constructor(private httpService: HttpService) {
  }

  public createSocket(): void {
    this.webSocket = new WebSocket(
      `${this.BASE_URL}/api/streaming/ws/v1/realtime?token=${this.httpService.token}`,
    );
  }

  public listenSocketEvents(): void {
    this.subscribeToEvent('open', () => console.log('Connection established!'));
    this.subscribeToEvent('error', (e: any) => console.error(e.message))
    this.subscribeToEvent('close', () => console.log('Connection has been closed'))
    this.subscribeToEvent('message', (e: MessageEvent<string>) => {
      if (e.data) {
        const message: SubscriptionResponse = JSON.parse(e.data);
        if(message.type === 'l1-update') {
          this.selectedInstrument = new SelectedInstrumentAdapter(message)
        }
      }
    })
  }

  private subscribeToEvent(eventName: string, handler: (event?: any) => void): void {
    this.websocketEvents[eventName] = fromEvent(this.webSocket, eventName).subscribe(handler.bind(this))
  }

  public subscribeToResponse(subscribe: boolean, instrumentId: string = this.defaultPayload.instrumentId): void {
    if(instrumentId) {
    this.webSocket.send(JSON.stringify({...this.defaultPayload, subscribe, instrumentId}))
    }
  }
}


