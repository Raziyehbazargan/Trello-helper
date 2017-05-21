'use strict';

import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/board.service';
import { Board } from '../../models/board';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'boards',
  templateUrl: './board.template.html',
  providers: [BoardsService]
})

export class BoardComponent implements OnInit {
  userInfo: string;
  boardsIDs: any[];
  boardsInfo: any[];

  constructor(private service: BoardsService) {}

  getBoards() {
    return this.service.getBoards()
    .map((boards) => {
      this.userInfo = boards;
      this.boardsIDs = boards['idBoards'];
    })
    .catch((error) {
      console.log(error);
      throw error;
    });
  }

  ngOnInit() {
    this.getBoards()
    .subscribe((data:any) => {
      var data;
      this.boardsIDs.map((id:any) => {

        this.service.getBoard(id)
        .map(board => this.data.push(board))
        .subscribe((board:any) => {
          console.log(board);
          //this.boardsInfo.push(board)
          //this.boardsInfo.push(board);
        })
      })
    })
  }
}



//You can think of the subscribe() method as if we were calling then() on a promise that was
//returned, or if you think about this as an array, subscribe() is like the forEach() method
//on an array. It's kind of like map() in that it receives whatever is inside of
//the array, or in this case the observable.
