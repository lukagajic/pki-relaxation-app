import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog) { }

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getUser();
  }

  onEditProfileClick() {
    this.dialog.open(EditProfileComponent, {
      data: {
        dialogData: this.currentUser
      }
    });
  }

}
