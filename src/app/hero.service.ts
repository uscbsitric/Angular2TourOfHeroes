import { Injectable } from '@angular/core';
import { Hero }       from './hero';
import { HEROES }     from './mock-heroes';
import { Observable } from 'rxjs/Rx';
import { of }         from 'rxjs/observable/of';

// The @Injectable() decorator tells Angular that this service might itself have injected dependencies.
// It doesn't have dependencies now but applying the @Injectable() decorator from the start ensures
// consistency and future proofing.
@Injectable()

export class HeroService
{

  constructor()
  {

  }

  getHeroes(): Observable<Hero[]>
  {
    return of(HEROES);
  }

}
