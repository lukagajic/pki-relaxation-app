import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event.model';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatSort, MatSnackBar } from '@angular/material';
import { ConfirmComponent } from './confirm/confirm.component';
import { User } from '../../models/user.model';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ShowParticipantsComponent } from './show-participants/show-participants.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, AfterViewInit {

  constructor(private eventService: EventService,
              private userService: UserService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  // events = [];

  currentUser: User;

  // MatTable niz imena kolona za prikazivanje
  displayedColumns = ['name', 'description', 'category', 'city', 'address', 'startsAt',
                      'endsAt', 'expectedAttendance', 'participants', 'options'];

  // Definisanje izvora podataka za MatTable element
  eventDataSource = new MatTableDataSource<Event>();


  // Od Angular verzije 8, ViewChild prihvata 2 argumenta
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit() {
    this.eventDataSource.sort = this.sort;
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.eventDataSource.data = data;
    });

    this.currentUser = this.userService.getUser();
  }

  onDelete(event: Event) {
    this.dialog.open(ConfirmComponent , {
      data: {
        currentEvent: event
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.eventDataSource.data = this.eventDataSource.data.filter(evt => {
          return evt !== event;
        });

        this.eventService.deleteEventById(event).subscribe(data => {
          const response = data;
          if (response.success) {
            this.snackBar.open(response.message, 'close', {
              duration: 3000
            });
          } else {
            this.snackBar.open('Error while deleting event', 'close', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  onEditEventClick(event: Event) {
    this.dialog.open(EditEventComponent, {
      data: {
        dialogData: event,
        minHeight: '95vh',
        autoFocus: false
      }
    });
  }

  joinEvent(event: Event) {
    this.currentUser.joinedEvents.push(event._id);
    this.userService.updateUser(this.currentUser).subscribe(data => {
      if (data) {
        this.snackBar.open('Successfully joined an event!', 'close', {
          duration: 3000
        });
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      }
    });
  }

  isUserJoinedToEvent(event: Event) {
    if (this.currentUser.joinedEvents.includes(event._id)) {
      return true;
    }
    return false;
  }

  showParticipants(event: Event) {
    this.dialog.open(ShowParticipantsComponent, {
      data: {
        dialogData: event
      }
    });
  }

  doFilter(filterValue: string) {
    this.eventDataSource.filter = filterValue.trim().toLowerCase();
  }

}
