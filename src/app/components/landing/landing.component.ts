import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent {
  constructor(private http: Http, private _router: Router, private _location: Location) {}
  login() {
    console.log('in logi method')
    return this.http.get(`http://localhost:4000/api/auth/login`)
    .subscribe((res: Response) => {
       let data = res.json();
       window.location.href = `https://trello.com/1/OAuthAuthorizeToken?oauth_token=${data.oauth_token}&name=${data.name}`;
    })
  }
}
