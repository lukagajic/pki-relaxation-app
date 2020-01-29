import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Rute za pristup bekendu
  private readonly registerRoute = 'http://localhost:3000/users/register';
  private readonly loginRoute    = 'http://localhost:3000/users/login';
  private readonly regularRoute  = 'http://localhost:3000/users';

  private authToken;
  user: User;

  // Pomocna biblioteka za rad sa JWT tokenima
  helper = new JwtHelperService();

  // Header za register i login metode
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // Header za autorizaciju koji dodaje JWT kako bi mogli da pristupimo zasticenim rutama
  private getAuthHeaders() {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('id_token'))
    };

    return httpOptions;
  }

  // Metoda za logovanje korisnika
  login(emailParam: string, passwordParam: string) {
    const body = {
      email: emailParam,
      password: passwordParam
    };

    return this.http.post<any>(this.loginRoute, body, { headers: this.headers });
  }

  // Metoda za registraciju korisnika
  register(user: User) {
    return this.http.post<any>(this.registerRoute, user, { headers: this.headers });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // TODO: Ispraviti ovu metodu, sada postoji GET ruta specijalno za ovaj zadatak!
  getJoinedEvents() {
    const userId = this.getUser().id;
    return this.http.get<User>(this.regularRoute + '/' + userId, this.getAuthHeaders());
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Metoda za azuriranje informacija o postojecem korisniku
  updateUser(user: User) {
    // this.storeUserUpdate(user);
    return this.http.put(this.regularRoute + '/' + user.id, user, this.getAuthHeaders());
  }


  // Metoda koja proverava da li je korisnik autentifikovan
  isUserAuthenticated(): boolean {
    this.loadToken();

    if ((this.authToken === null && this.user === null) || this.helper.isTokenExpired(this.authToken)) {
      return false;
    }
    return true;
  }

  // Metoda koja vraca sve ucesnike za neki dogadjaj
  getUsersForEvent(event: Event) {
    return this.http.get<any>(this.regularRoute + '/event/' + event._id);
  }

  isUserJoinedToEvent(event: Event): boolean {
    if (this.getUser().joinedEvents.includes(event._id)) {
      return true;
    }
    return false;
  }

}
