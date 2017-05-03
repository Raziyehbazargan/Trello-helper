'use strict';

import { Component } from '@angular/core';

 export class Hero {
   id: number;
   name: string;
 }

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
})

export class AppComponent {}
