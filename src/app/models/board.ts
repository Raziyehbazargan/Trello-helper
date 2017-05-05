export class Board {
  constructor(
    public id: string,
    public name: string,
    public desc: string,
    public closed: boolean,
    public url: string,
    public shortUrl: string,
    public labelNames: any[]
  ){}
}
