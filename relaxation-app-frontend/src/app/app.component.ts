import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  title = 'Relaxation App';
  user: User;

  ngOnInit() {
    if (this.userService.isUserAuthenticated()) {
      this.user = this.userService.getUser();
    }
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
