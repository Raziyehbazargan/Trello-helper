'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // for using NgModel and input tg
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './components/app.component';
import { BoardComponent }  from './components/board/board.component';
import { LandingComponent }  from './components/landing/landing.component';

@NgModule({
  imports:      [
    HttpModule,
    BrowserModule,
    FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent,
    LandingComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
