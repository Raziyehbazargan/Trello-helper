import { Board } from './board';

export class User {
  constructor (
    public id: string,
    public fullName: string,
    public url: string,
    public email: string,
    public username: string,
    public memberType: string,
    public idBoards: Board[]
){}
}
