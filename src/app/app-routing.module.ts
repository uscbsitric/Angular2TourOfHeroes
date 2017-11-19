import { NgModule }             from '@angular/core';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';


// You'll configure the router with Routes in the RouterModule so import those two symbols from the @angular/router library.
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '',
                        redirectTo: '/dashboard',
                        pathMatch: 'full'
                        },
                        {path: 'heroes',
                         component: HeroesComponent
                        },
                        {path: 'dashboard',
                         component: DashboardComponent
                        },
                        {path: 'detail/:id',  // a parameterized route, The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
                         component: HeroDetailComponent
                        }
                       ];

// You generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.
@NgModule({imports: [RouterModule.forRoot(routes) // You first must initialize the router and start it listening for browser location changes
                                                  // Add RouterModule to the @NgModule.imports array and configure it with the routes in one step by 
                                                  // calling RouterModule.forRoot() within the imports array
                                                  // The method is called forRoot() because you configure the router at the application's root level. 
                                                  // The forRoot() method supplies the service providers and directives needed for routing, and performs 
                                                  // the initial navigation based on the current browser URL.

                                                  /* https://stackoverflow.com/questions/39653072/how-to-use-forroot-within-feature-modules-hierarchy
                                                     https://stackoverflow.com/questions/39664861/importing-modules-with-forroot
                                                     forRoot is only used for the main app module. 
                                                     It is a convention used so that only the app module gets application/singleton providers. 
                                                     This is to avoid providers that are supposed to be singletons, 
                                                     being created more than once for the application
                                                  */
                    ],
           exports: [RouterModule, //  Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
                    ]
          }
         )

export class AppRoutingModule
{

}
