import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.template.html'
})

export class UserProfileComponent {
  @Input() userProfile: Object
}
