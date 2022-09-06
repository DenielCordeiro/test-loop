import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test-loop';
  // loggedInUser?: boolean;

  constructor( private authService: AuthService ) {}

  get loggedInUser(): User | null {
    return this.authService.loggedInUser;
  }
}
