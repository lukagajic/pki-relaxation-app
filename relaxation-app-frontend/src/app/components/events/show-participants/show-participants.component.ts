import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../models/user.model';
import { Event } from '../../../models/event.model';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-participants',
  templateUrl: './show-participants.component.html',
  styleUrls: ['./show-participants.component.css']
})
export class ShowParticipantsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData,
              private userService: UserService) { }

  participants: User[];
  clickedEvent = this.dialogData.dialogData;
  participantsCount: number;

  ngOnInit() {
    this.userService.getUsersForEvent(this.clickedEvent).subscribe(data => {
      this.participants = data;
      this.participantsCount = this.participants.length;
    });
  }

}
