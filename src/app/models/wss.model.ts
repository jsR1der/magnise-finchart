import {SubscriptionKindValue, SubscriptionResponse} from "./instuments.model";

export class WebsocketMessage {
  constructor(public type: WebsocketMessageType) {
  }
}


export type WebsocketMessageType = 'session' | 'response' | 'l1-subscription' | 'l1-update' | 'multi-session'


export class SelectedInstrumentAdapter {
  public data: SubscriptionKindValue;
  public isLast: boolean = false;

  constructor(response: SubscriptionResponse) {
    if (response['ask']) {
      this.data = response['ask'];
    } else if (response['bid']) {
      this.data = response['bid'];
    } else {
      this.data = response['last']
      this.isLast = true;
    }
  }
}
