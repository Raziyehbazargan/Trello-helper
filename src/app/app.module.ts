'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // for using NgModel and input tg
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { BoardComponent }  from './board.component';

@NgModule({
  imports:      [
    HttpModule,
    BrowserModule,
    FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent,
    BoardComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
