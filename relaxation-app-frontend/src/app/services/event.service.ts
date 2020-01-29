import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventRoute = 'http://localhost:3000/events';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  private getAuthHeaders() {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('id_token'))
    };

    return httpOptions;
  }


  getEvents() {
    return this.http.get<Event[]>(this.eventRoute);
  }

  addEvent(event: Event) {
    return this.http.post<Event>(this.eventRoute, event, this.getAuthHeaders());
  }

  updateEvent(event: Event) {
    return this.http.put(this.eventRoute + '/' + event._id, event, this.getAuthHeaders());
  }

  deleteEventById(event: Event) {
    const eventId = event._id;
    return this.http.delete<any>(this.eventRoute + '/' + eventId, this.getAuthHeaders());
  }

  getFinishedEvents() {
    return this.http.get<Event[]>(this.eventRoute + '/finished', this.getAuthHeaders());
  }

  rateEvent(event: Event) {
    return this.http.put(this.eventRoute + '/' + event._id + '/rate', event, this.getAuthHeaders());
  }

  isEventFinished(event: Event) {
    if (new Date(event.endsAt) < new Date()) {
      return true;
    }
    return false;
  }

}
