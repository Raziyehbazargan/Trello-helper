'use strict';

import { Component, OnInit } from '@angular/core';
import { BoardsService } from './board.service';
//import { Board } from './board';

@Component({
  selector: 'boards',
  templateUrl: '../templates/board.component.html',
  providers: [BoardsService]
})

export class BoardComponent implements OnInit {
  boards: [];

  constructor(private service: BoardsService) {}

  ngOnInit() {
    this.service.getBoards().subscribe(boards => {
      this.boards = boards;
    })
  }
}



//You can think of the subscribe() method as if we were calling then() on a promise that was
//returned, or if you think about this as an array, subscribe() is like the forEach() method
//on an array. It's kind of like map() in that it receives whatever is inside of
//the array, or in this case the observable.
