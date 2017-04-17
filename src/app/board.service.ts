'use strict';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Board } from './model/board';

@Injectable()
export class BoardsService {
  constructor(private http: Http) {}

    extractData(res: Response) {
      return res.json();
    }
    getBoards(): Observable<Board[]> {
      return this.http.get('api/trello/boards').map(this.extractData);
      //think of the map() function here as the then() method on a promise.
    }
}
