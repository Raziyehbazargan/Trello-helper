'use strict';

import { Component } from '@angular/core';

 export class Hero {
   id: number;
   name: string;
 }

// Two-way binding
@Component({
  selector: 'my-app',
  template: `<boards></boards>`
})

export class AppComponent {
   title = 'Tour of Heroes';
   hero: Hero = {
     id: 1,
     name: 'windstorm'
   };
 }
