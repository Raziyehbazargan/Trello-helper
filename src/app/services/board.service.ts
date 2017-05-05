'use strict';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Board } from '../models/board';

@Injectable()
export class BoardsService {
  constructor(private http: Http) {}

    extractData(res: Response) {
      return res.json();
    }
    getBoards(): Observable<any[]> {
      return this.http.get('http://localhost:4000/api/trello/boards')
      .map(this.extractData);
      //think of the map() function here as the then() method on a promise.
    }
}
