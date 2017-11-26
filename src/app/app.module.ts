import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms'; // <-- NgModel lives here 
import { AppComponent }        from './app.component';
import { HeroesComponent }     from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService }         from './hero.service';
import { MessagesComponent }   from './messages/messages.component';
import { MessageService }      from './message.service';
import { AppRoutingModule }    from './/app-routing.module';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http'; // HttpClient is Angular's mechanism for communicating with a remote server over HTTP.
                                                            // make HttpClient available everywhere in the app.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './in-memory-data.service';
import { HttpClient } from '@angular/common/http/src/client';
import { HeroSearchComponent } from './hero-search/hero-search.component';
 
@NgModule({declarations: [AppComponent,
                          HeroesComponent,
                          HeroDetailComponent,
                          MessagesComponent,
                          DashboardComponent,
                          HeroSearchComponent
                         ],
           imports: [BrowserModule,
                     FormsModule,
                     AppRoutingModule,
                     HttpClientModule,

                     // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
                    // and returns simulated server responses.
                    // Remove it when a real server is ready to receive requests.
                     HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,
                                                            { dataEncapsulation: false }
                                                           )
                                                    /* https://stackoverflow.com/questions/39653072/how-to-use-forroot-within-feature-modules-hierarchy
                                                       https://stackoverflow.com/questions/39664861/importing-modules-with-forroot
                                                       forRoot is only used for the main app module. 
                                                       It is a convention used so that only the app module gets application/singleton providers. 
                                                       This is to avoid providers that are supposed to be singletons, 
                                                       being created more than once for the application
                                                    */
                    ],
           providers: [HeroService, MessageService ],  // The providers array tells Angular to create a single, 
                                                       // shared instance of HeroService and inject into any class that asks for it.
           bootstrap: [AppComponent]
          }
        )

export class AppModule { }