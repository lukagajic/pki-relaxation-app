import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../models/event.model';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  isLinear = true;
  eventNameFG: FormGroup;
  eventDescriptionFG: FormGroup;
  eventCategoryFG: FormGroup;
  eventCityFG: FormGroup;
  eventAddressFG: FormGroup;
  eventDateFG: FormGroup;
  eventExpectedAttendanceFG: FormGroup;

  defaultDate = new Date();

  ngOnInit() {

    this.eventNameFG = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.eventDescriptionFG = this.formBuilder.group({
      eventDescription: ['', [Validators.required, Validators.minLength(12)]]
    });

    this.eventCategoryFG = this.formBuilder.group({
      eventCategory: ['', Validators.required]
    });

    this.eventCityFG = this.formBuilder.group({
      eventCity: ['', Validators.required]
    });

    this.eventAddressFG = this.formBuilder.group({
      eventAddress: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.eventDateFG = this.formBuilder.group({
      eventStartsAt: [this.defaultDate, Validators.required],
      eventEndsAt: [this.defaultDate, Validators.required]
    });

    this.eventExpectedAttendanceFG = this.formBuilder.group({
      eventExpectedAttendance: [null, [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]+$/)]]
    });
  }

  private prepareEventWithFormData(): Event {
    const eventName = this.eventNameFG.value.eventName;
    const eventDescription = this.eventDescriptionFG.value.eventDescription;
    const eventCategory = this.eventCategoryFG.value.eventCategory;
    const eventCity = this.eventCityFG.value.eventCity;
    const eventAddress = this.eventAddressFG.value.eventAddress;
    const eventStartsAt = this.eventDateFG.value.eventStartsAt;
    const eventEndsAt = this.eventDateFG.value.eventEndsAt;
    const eventExpectedAttendance = this.eventExpectedAttendanceFG.value.eventExpectedAttendance;

    return {
      name: eventName,
      description: eventDescription,
      category: eventCategory,
      city: eventCity,
      address: eventAddress,
      startsAt: eventStartsAt,
      endsAt: eventEndsAt,
      expectedAttendance: eventExpectedAttendance
    };
  }

  onSubmit() {
    const event = this.prepareEventWithFormData();

    this.eventService.addEvent(event).subscribe(data => {
      if (!data) {
        this.snackBar.open('Error while submitting an event', 'close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Event successfully created', 'close', {
          duration: 3000
        });
      }
    });

    this.router.navigate(['dashboard']);
  }
}
