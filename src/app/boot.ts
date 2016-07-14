import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import {HTTP_PROVIDERS} from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {  provide } from '@angular/core';
// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { appRouterProviders } from './main/main.routers';
import { AppComponent } from './main/main.component';
import { AuthService } from './user/auth.service';
import { AuthAdminGuard, AuthGuard } from './user/auth.guard';
// import { BS_VIEW_PROVIDERS } from 'ng2-bootstrap';

enableProdMode();

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    AuthService,
    AuthAdminGuard,
     AuthGuard,
    //  BS_VIEW_PROVIDERS,
       disableDeprecatedForms(), 
  provideForms()
    // { provide: LocationStrategy, useClass: HashLocationStrategy }] //, [
         //   HTTP_PROVIDERS,
        // not required, but recommended to have 1 unique instance of your service
//TRANSLATE_PROVIDERS
]
)
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));
