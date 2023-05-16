import { Injectable } from '@angular/core';
import { IHero } from './IHero';
import  { HEROES } from './mock-heroes'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  /** GET heroes from the server */
  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<IHero[]>('Get Heroes', []))
      )
  }

  getHero(id:number):Observable<IHero>{
    const url = `${this.heroesUrl}/${id}`;
    const hero = HEROES.find(hero => hero.id === id)!
    this.log(`fetched hero id=${id}`)
    return of(hero)

    return this.http.get<IHero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<IHero>(`getHero id=${id}`))
      )
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return(error:any):Observable<T> => {
      console.error(error)

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the hero on the server */
  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: IHero): Observable<IHero> {
  return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<IHero>('addHero'))
  );
}
}
