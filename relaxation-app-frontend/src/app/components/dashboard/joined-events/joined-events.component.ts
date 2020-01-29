import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatSort, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user.model';
import { Event } from '../../../models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-joined-events',
  templateUrl: './joined-events.component.html',
  styleUrls: ['./joined-events.component.css']
})
export class JoinedEventsComponent implements OnInit, AfterViewInit {

  constructor(private eventService: EventService,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  displayedColumns = ['name', 'description', 'category', 'city', 'address', 'startsAt',
                      'endsAt', 'rating', 'expectedAttendance', 'options'];
  joinedEventsDataSource = new MatTableDataSource<Event>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getUser();

    this.userService.getJoinedEvents().subscribe(data => {
      this.joinedEventsDataSource.data = data.joinedEvents;
    });

  }

  ngAfterViewInit() {
    this.joinedEventsDataSource.sort = this.sort;
  }

  leaveEvent(event: Event) {
    this.joinedEventsDataSource.data = this.joinedEventsDataSource.data.filter(evt => {
      return evt !== event;
    });

    this.currentUser.joinedEvents = this.currentUser.joinedEvents.filter(evt => evt !== event._id);

    this.userService.updateUser(this.currentUser).subscribe(data => {
      if (data) {
        this.snackBar.open('Succesfully left an event!', 'close', {
          duration: 3000
        });
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        this.snackBar.open('Error while leaving an event!', 'close', {
          duration: 3000
        });
      }
    });
  }

  doFilter(filterValue: string) {
    this.joinedEventsDataSource.filter = filterValue.trim().toLowerCase();
  }

}
