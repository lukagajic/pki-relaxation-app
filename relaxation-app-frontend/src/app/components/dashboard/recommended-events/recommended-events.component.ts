import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from '../../../models/event.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-recommended-events',
  templateUrl: './recommended-events.component.html',
  styleUrls: ['./recommended-events.component.css']
})
export class RecommendedEventsComponent implements OnInit {

  constructor(private eventService: EventService, private userService: UserService) { }

  private events;
  private recommendedEvents;

  ngOnInit() {
    this.loadRecommendedEvents();
  }

  loadRecommendedEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;

      this.recommendedEvents = this.events.filter(result =>
        result.city === this.userService.getUser().city &&
        this.userService.getUser().interests.includes(result.category) &&
        !this.eventService.isEventFinished(result) &&
        result.status === 'Regular');
    });
  }

}
