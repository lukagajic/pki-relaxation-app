import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../../../../models/event.model';
import { EventService } from '../../../../services/event.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rate-event',
  templateUrl: './rate-event.component.html',
  styleUrls: ['./rate-event.component.css']
})
export class RateEventComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData,
              private dialog: MatDialogRef<RateEventComponent>,
              private snackBar: MatSnackBar,
              private eventService: EventService) { }

  clickedEvent: Event;
  sliderValue = 1;

  ngOnInit() {
    this.clickedEvent = this.dialogData.dialogData;
  }

  rateEvent() {
    if (this.clickedEvent.rating === 0) {
      this.clickedEvent.rating = this.sliderValue;
    } else {
      this.clickedEvent.rating = (this.clickedEvent.rating + this.sliderValue) / 2;
    }

    this.eventService.rateEvent(this.clickedEvent).subscribe(data => {
      if (data) {
        this.snackBar.open('Event rated successfully', 'close', {
          duration: 3000
        });
        this.dialog.close();
      }
    });
  }
}
