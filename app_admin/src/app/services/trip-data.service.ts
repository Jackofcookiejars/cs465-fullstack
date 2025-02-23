import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) {}
  baseUrl = 'http://localhost:3000/api';

  getTrips() : Observable<Trip[]>
  {
    return this.http.get<Trip[]>(this.baseUrl + '/trips');
  }

  addTrip(formData: Trip) : Observable<Trip>
  {
    return this.http.post<Trip>(this.baseUrl + '/trips', formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    //console.log('Getting Trips (inside getTrip())');
    return this.http.get<Trip[]>(this.baseUrl + '/trips'+'/'+tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    //console.log('Updating Trips (inside updateTrip())');
    return this.http.put<Trip>(this.baseUrl + '/trips' + '/' + formData.code, formData);
  }

  //Call to login endpoint. Returns Token.
  login(user: User, passwd: string) : Observable<AuthResponse>{
    //console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string) : Observable<AuthResponse>{
    //console.log('In TripDataService::register)
    return this.handleAuthAPICall('register',user,passwd);
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse>{
    //console.log('In TripDataService::handleAuthAPICall);
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl+'/'+endpoint, formData);
  }
}
