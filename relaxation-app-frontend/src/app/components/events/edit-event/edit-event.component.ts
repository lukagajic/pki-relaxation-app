import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private eventService: EventService,
              private dialog: MatDialogRef<EditEventComponent>) { }

  currentEvent: Event;

  isLinear = true;
  eventNameFG: FormGroup;
  eventDescriptionFG: FormGroup;
  eventCategoryFG: FormGroup;
  eventCityFG: FormGroup;
  eventAddressFG: FormGroup;
  eventDateFG: FormGroup;
  eventExpectedAttendanceFG: FormGroup;
  eventStatusFG: FormGroup;

  ngOnInit() {
    this.currentEvent = this.dialogData.dialogData;

    this.eventNameFG = this.formBuilder.group({
      eventName: [this.currentEvent.name, [Validators.required, Validators.minLength(6)]]
    });

    this.eventDescriptionFG = this.formBuilder.group({
      eventDescription: [this.currentEvent.description, [Validators.required, Validators.minLength(12)]]
    });

    this.eventCategoryFG = this.formBuilder.group({
      eventCategory: [this.currentEvent.category, Validators.required]
    });

    this.eventCityFG = this.formBuilder.group({
      eventCity: [this.currentEvent.city, Validators.required]
    });

    this.eventAddressFG = this.formBuilder.group({
      eventAddress: [this.currentEvent.address, [Validators.required, Validators.minLength(5)]]
    });

    this.eventDateFG = this.formBuilder.group({
      eventStartsAt: [this.currentEvent.startsAt, Validators.required],
      eventEndsAt: [this.currentEvent.endsAt, Validators.required]
    });

    this.eventExpectedAttendanceFG = this.formBuilder.group({
      eventExpectedAttendance: [this.currentEvent.expectedAttendance, [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]+$/)]]
    });

    this.eventStatusFG = this.formBuilder.group({
      eventStatus: [this.currentEvent.status, Validators.required]
    });
  }

  private prepareEventWithFormData(): void {
      this.currentEvent.name = this.eventNameFG.value.eventName,
      this.currentEvent.description = this.eventDescriptionFG.value.eventDescription;
      this.currentEvent.category = this.eventCategoryFG.value.eventCategory;
      this.currentEvent.city = this.eventCityFG.value.eventCity;
      this.currentEvent.address = this.eventAddressFG.value.eventAddress;
      this.currentEvent.startsAt = this.eventDateFG.value.eventStartsAt;
      this.currentEvent.endsAt = this.eventDateFG.value.eventEndsAt;
      this.currentEvent.expectedAttendance = this.eventExpectedAttendanceFG.value.eventExpectedAttendance;
      this.currentEvent.status = this.eventStatusFG.value.eventStatus;
  }

  updateEvent() {
    this.prepareEventWithFormData();

    this.eventService.updateEvent(this.currentEvent).subscribe(data => {
      if (!data) {
        this.snackBar.open('Error while submitting an event', 'close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Event successfully updated', 'close', {
          duration: 3000
        });
      }
      this.dialog.close();
    });
  }
}
