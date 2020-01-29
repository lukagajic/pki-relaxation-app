import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.userService.isUserAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.userService.login(email, password).subscribe(data => {
      const response = data;

      if (response.success) {
        this.snackBar.open(data.message, 'close', {
          duration: 3000
        });

        this.userService.storeUserData(data.token, data.user);

        this.router.navigate(['events']);
      } else {
        this.snackBar.open(data.message, 'close', {
          duration: 3000
        });

        this.router.navigate(['login']);
      }
    });

  }
}
