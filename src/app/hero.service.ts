import { Injectable } from '@angular/core';
import { Hero }       from './hero';
import { HEROES }     from './mock-heroes';
import { Observable } from 'rxjs/Rx';
import { of }         from 'rxjs/observable/of';
import { MessageService } from './message.service';

// The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
// It doesn't have dependencies now but applying the @Injectable() decorator from the start ensures
// consistency and future proofing.
@Injectable()

export class HeroService
{

  constructor(private messageService: MessageService)
  {

  }

  getHeroes(): Observable<Hero[]>
  {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero>
  {
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    // as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // Template literals are string literals allowing embedded expressions.
    // Template literals are enclosed by the back-tick (` `)  (grave accent) character instead of double or single quotes. 
    // Template literals can contain placeholders. These are indicated by the dollar sign and curly braces (${expression}). 
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    return of(HEROES.find(hero => hero.id === id));
  }

}
