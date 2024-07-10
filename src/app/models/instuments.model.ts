import {WebsocketMessage, WebsocketMessageType} from "./wss.model";

export interface InstrumentsModel {
  paging: Paging;
  data: Instrument[];
}

export interface Instrument {
  id: string;
  symbol: string;
  kind: Kind;
  description: string;
  tickSize: number;
  currency: string;
  baseCurrency: string;
  mappings: Mappings;
}

export enum Kind {
  Forex = "forex",
}

export interface Mappings {
  "active-tick": Provider;
  simulation?: Provider;
  oanda: Provider;
  dxfeed?: Provider;
}

export interface Provider {
  symbol: string;
  exchange: Exchange;
  defaultOrderSize: number;
}

export enum Exchange {
  Empty = "",
  Msfx = "MSFX",
}

export interface Paging {
  page: number;
  pages: number;
  items: number;
}

export type SubscriptionKind = Record<SubscriptionKindKey, SubscriptionKindValue>;

export interface SubscriptionKindValue {
  price: number;
  volume: number;
  timestamp: string;
  change?: number;
  changePct?: number;
}

export type SubscriptionKindKey = "ask" | "bid" | "last";

export class SubscriptionResponse {
  public type = "l1-update";
  public ask: SubscriptionKindValue;
  public bid: SubscriptionKindValue;
  public last: SubscriptionKindValue;

  constructor(public instrumentId: string,
              public provider: keyof Mappings = 'simulation',
              kind: SubscriptionKind
  ) {
    if (kind['ask']) {
      this.ask = kind['ask']
    }

    if (kind['bid']) {
      this.ask = kind['bid']
    }

    if (kind['bid']) {
      this.ask = kind['bid']
    }

  }
}

export class SubscriptionPayload extends WebsocketMessage {
  public id = '1';
  public kinds: SubscriptionKindKey[] = ['ask', 'bid', 'last']

  constructor(type: WebsocketMessageType, public instrumentId: string, public provider: keyof Mappings,public subscribe: boolean) {
    super(type);
  }
}




