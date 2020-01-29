import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { User } from '../../../models/user.model';
import { Event } from '../../../models/event.model';
import { MatDialog } from '@angular/material';
import { RateEventComponent } from './rate-event/rate-event.component';
import { MatTableDataSource, MatDialogConfig, MatSort, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-finished-events',
  templateUrl: './finished-events.component.html',
  styleUrls: ['./finished-events.component.css']
})
export class FinishedEventsComponent implements OnInit {

  finishedEventsDataSource = new MatTableDataSource<Event>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private eventService: EventService,
              private dialog: MatDialog,
              private userService: UserService) { }

  displayedColumns = ['name', 'description', 'category', 'city', 'address', 'startsAt',
                      'endsAt', 'rating', 'expectedAttendance', 'status', 'options'];

  ngOnInit() {
    this.eventService.getFinishedEvents().subscribe(data => {
      this.finishedEventsDataSource.data = data;
    });
  }

  onRateEventClick(event: Event) {
    this.dialog.open(RateEventComponent, {
      data: {
        dialogData: event
      }
    });
  }

  doFilter(filterValue: string) {
    this.finishedEventsDataSource.filter = filterValue.trim().toLowerCase();
  }

}
