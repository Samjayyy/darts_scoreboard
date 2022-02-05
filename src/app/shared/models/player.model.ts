export class Player {
  public name: string = '';
  public score: number = 301;
  public subscores: Array<number> = [];
  public selected: boolean = false;

  public get throwCount(): number {
    return this.subscores.length;
  }

  public get thrownSum(): number {
    return this.subscores.reduce((a, b) => a + b);
  }

  public get avgScore(): number {
    return this.throwCount === 0 ? 0 : this.thrownSum / this.throwCount;
  }

  public get subScoreString(): string {
    return '(' + this.subscores.join(', ') + ')';
  }
}
