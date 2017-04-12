'use strict';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; // for using NgModel and input tg

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
