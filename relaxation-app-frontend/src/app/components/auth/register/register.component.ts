import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  maxDateValue = new Date();

  ngOnInit() {
    if (this.userService.isUserAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(form: NgForm) {
    const user = {
      forename: form.value.forename,
      surname: form.value.surname,
      email: form.value.email,
      password: form.value.password,
      city: form.value.city,
      bornAt: form.value.bornAt,
      // tslint:disable-next-line: quotemark
      interests: form.value.interests.trim().split(" "),
      address: form.value.address
    };


    this.userService.register(user).subscribe(data => {
      const response = data;

      if (data.success) {
        this.snackBar.open(response.message, 'close', {
          duration: 3000
        });
        this.router.navigate(['login']);
      }
    });
  }
}
