import { NgModule }             from '@angular/core';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';


// You'll configure the router with Routes in the RouterModule so import those two symbols from the @angular/router library.
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: 'heroes',
                         component: HeroesComponent
                        },
                        {path: 'dashboard',
                         component: DashboardComponent
                        },
                        {path: '',
                         redirectTo: '/dashboard',
                         pathMatch: 'full'
                        }
                       ];

// You generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.
@NgModule({imports: [RouterModule.forRoot(routes) // You first must initialize the router and start it listening for browser location changes
                                                  // Add RouterModule to the @NgModule.imports array and configure it with the routes in one step by 
                                                  // calling RouterModule.forRoot() within the imports array
                                                  // The method is called forRoot() because you configure the router at the application's root level. 
                                                  // The forRoot() method supplies the service providers and directives needed for routing, and performs 
                                                  // the initial navigation based on the current browser URL.
                    ],
           exports: [RouterModule, //  Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
                    ]
          }
         )

export class AppRoutingModule
{

}
