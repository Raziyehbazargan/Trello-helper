'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // for using NgModel and input tg
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { BoardComponent }  from './components/board/board.component';
import { LandingComponent }  from './components/landing/landing.component';
import { HomeComponent }  from './components/home/home.component';

const appRoutes: Routes = [
  // {path: 'api/auth/trello/callback', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'board', component: BoardComponent},
  {path: '', component: LandingComponent},
  //{path: '/login', component: BoardComponent, data: {title: 'Login with Trello'}}, //data: Use it to store items such as page titles, breadcrumb text, and other read-only, static data.
  {path: '', redirectTo: '/', pathMatch: 'full'}
  //The empty path in the fourth route represents the default path for the application, the place to go when the path in the URL is empty, as it typically is at the start.
  //{path: '**', component: PageNotFoundComponent}
  //The ** path in the last route is a wildcard. The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the configuration
];

@NgModule({
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  imports:      [
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserModule,
    FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    BoardComponent,
    HomeComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
