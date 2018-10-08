import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Auth, User } from '../_models/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

// Note: communication with remote server is mimicked through InMemoryDataService
export class AuthService {
  
  private baseUrl = 'api/accounts';  // URL to web api

  constructor(private http: HttpClient) { }

  //////// Save methods //////////
  
  /** POST: do something server-side */
  addUserOfLogin(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, httpOptions)
            .pipe(
              catchError(this.handleError<User>('AsyncPostError'))
            )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
