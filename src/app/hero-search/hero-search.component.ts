import { Component, 
         OnInit, 
         ViewEncapsulation 
       }                     from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { of }                from 'rxjs/observable/of';
import { debounceTime,
         distinctUntilChanged,
         switchMap
       }                     from 'rxjs/operators';
import { Hero }              from '../hero';
import { HeroService }       from '../hero.service';
import { debounce } from 'rxjs/operators/debounce';

@Component({selector: 'app-hero-search',
            templateUrl: './hero-search.component.html',
            styleUrls: ['./hero-search.component.css'],
            encapsulation: ViewEncapsulation.None
           }
          )

export class HeroSearchComponent implements OnInit
{
  heroes$: Observable<Hero[]>;

  // The searchTerms property is declared as an RxJS Subject.
  /*A Subject is both a source of observable values and an Observable itself. 
    You can subscribe to a Subject as you would any Observable.
    You can also push values into that Observable by calling its next(value)
   */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService)
  {
    
  }

  ngOnInit()
  {
    this.heroes$ = this.searchTerms.pipe( // wait 300ms after each keystroke before considering the term
                                          debounceTime(300),

                                          // ignore new term if same as previous terms
                                          distinctUntilChanged(),

                                          // switch to new search observable each time the term changes
                                       // switchMap<T, R>( project: (value: T, index: number) => ObservableInput<R> ): OperatorFunction<T, R>;
                                       /**
                                        * With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call. 
                                          Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.
                                          switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call. 
                                          Results from prior calls are canceled and discarded.
                                          Note that canceling a previous searchHeroes() Observable doesn't actually abort a pending HTTP request. 
                                          Unwanted results are simply discarded before they reach your application code.
                                        */
                                          switchMap( (term: string) => this.heroService.searchHeroes(term) )
                                        );
  }

  // Push a search term into the observable stream.
  search(term: string): void
  {
    this.searchTerms.next(term);
  }

}
