import { Injectable }               from '@angular/core';
import { Hero }                     from './hero';
import { Observable }               from 'rxjs/Rx';
import { of }                       from 'rxjs/observable/of';
import { catchError, map, tap }     from 'rxjs/operators'; // To catch errors, you "pipe" the observable result from http.get() 
                                                           // through an RxJS catchError() operator. Import the catchError symbol 
                                                           // from rxjs/operators, along with some other operators you'll need later.

import { MessageService }           from './message.service';
import { HttpClient, HttpHeaders }  from '@angular/common/http';

// The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
// It doesn't have dependencies now but applying the @Injectable() decorator from the start ensures
// consistency and future proofing.
@Injectable()

export class HeroService
{
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private messageService: MessageService,
              private http: HttpClient
             )
  {

  }

  // Getting Heroes from the server
  getHeroes(): Observable<Hero[]>
  {
    /*
    HttpClient.get returns the body of the response as an untyped JSON object by default. 
    Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    The shape of the JSON data is determined by the server's data API. 
    The Tour of Heroes data API returns the hero data as an array.
    */
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(catchError( this.handleError('getHeroes', []) ) // The catchError() operator intercepts an Observable that failed. 
                                                                          // It passes the error an error handler that can do what it wants 
                                                                          // with the error.
                         );
  }

  getHero(id: number): Observable<Hero>
  {
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    // as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // Template literals are string literals allowing embedded expressions.
    // Template literals are enclosed by the back-tick (` `)  (grave accent) character instead of double or single quotes. 
    // Template literals can contain placeholders. These are indicated by the dollar sign and curly braces (${expression}). 
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }


   /** Log a HeroService message with the MessageService */
   private log(message: string)
   {
    this.messageService.add('HeroService: ' + message);
   }


   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T)
   {
     return (error: any): Observable<T> => { // TODO: send the error to remote logging infrastructure
                                             console.error(error);

                                             // TODO: better job of transforming error for user consumption
                                             this.log(`${operation} failed: ${error.message}`);


                                             // Let the app keep running by returning an empty result.
                                             return of(result as T);
                                           };
   }

}
