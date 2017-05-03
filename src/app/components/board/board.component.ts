'use strict';

import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/board.service';
import { Board } from '../../models/board';

@Component({
  selector: 'boards',
  templateUrl: './board.template.html',
  providers: [BoardsService]
})

export class BoardComponent implements OnInit {
  userInfo: string;
  boardsIDs: string[];

  constructor(private service: BoardsService) {}

  ngOnInit() {
    this.service.getBoards()
    //.map((val: any) => JSON.parse(val))
    .subscribe((data:any) => {
      this.userInfo = data.url;
      this.boardsIDs = data['idBoards'];
    })
  }
}



//You can think of the subscribe() method as if we were calling then() on a promise that was
//returned, or if you think about this as an array, subscribe() is like the forEach() method
//on an array. It's kind of like map() in that it receives whatever is inside of
//the array, or in this case the observable.
