import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Team } from './f1';
//import { TEAMS } from './mock-f1';
import { MessageService } from './message.service';

@Injectable({providedIn: 'root'})

export class F1ServiceService {

  private teamsURL = 'api/teams';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private messageService: MessageService, 
    private http: HttpClient){}
  
  /** GET heroes from the server */
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsURL)
      .pipe(
        tap(_ => this.log('fetched teams')),
        catchError(this.handleError<Team[]>('getTeams', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getTeamsNo404<Data>(id: number): Observable<Team> {
    const url = `${this.teamsURL}/?id=${id}`;
    return this.http.get<Team[]>(url)
      .pipe(
        map(teams => teams[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} team id=${id}`);
        }),
        catchError(this.handleError<Team>(`getTeam id=${id}`))
      );
  }

  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsURL}/${id}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => this.log(`fetched team id=${id}`)),
      catchError(this.handleError<Team>(`getTeam id=${id}`))
    );
  }

  searchTeams(term: string): Observable<Team[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Team[]>(`${this.teamsURL}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found teams matching "${term}"`) :
         this.log(`no teams matching "${term}"`)),
      catchError(this.handleError<Team[]>('searchTeams', []))
    );
  }
  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamsURL, team, this.httpOptions).pipe(
      tap((newTeam: Team) => this.log(`added team w/ id=${newTeam.id}`)),
      catchError(this.handleError<Team>('addTeam'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTeam(id: number): Observable<Team> {
    const url = `${this.teamsURL}/${id}`;

    return this.http.delete<Team>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted team id=${id}`)),
      catchError(this.handleError<Team>('deleteTeam'))
    );
  }

  /** PUT: update the hero on the server */
  updateTeam(team: Team): Observable<any> {
    return this.http.put(this.teamsURL, team, this.httpOptions).pipe(
      tap(_ => this.log(`updated team id=${team.id}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Service: ${message}`);
  }
}
