export interface BarModel {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number
  v: number;
}

export class ChartBar {
  public x: string;
  public y: [number,number,number,number];
  constructor(bar: BarModel) {
    this.y = [bar.o,bar.h,bar.l,bar.c];
    this.x = bar.t;
  }
}
