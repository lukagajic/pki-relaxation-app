import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData,
              private userService: UserService,
              private dialog: MatDialogRef<EditProfileComponent>,
              private snackBar: MatSnackBar) { }

  isPasswordFieldDisabled = true;

  currentUser: User;
  userInterests;

  ngOnInit() {
    this.currentUser = this.dialogData.dialogData;
    this.userInterests = this.currentUser.interests;
    // tslint:disable-next-line: quotemark
    this.userInterests = this.userInterests.join(" ");
  }

  updateProfile() {
    // tslint:disable-next-line: quotemark
    this.currentUser.interests = this.userInterests.trim().split(" ");

    this.userService.updateUser(this.currentUser).subscribe(data => {
      if (data) {
        this.snackBar.open('Updated profile successfully', 'close', {
          duration: 3000
        });
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        this.snackBar.open('Error while updating profile!', 'close', {
          duration: 3000
        });
      }
      this.dialog.close();
    });
  }
}
