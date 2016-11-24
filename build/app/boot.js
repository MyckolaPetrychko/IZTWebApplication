// import { enableProdMode } from '@angular/core';
// import { bootstrap } from '@angular/platform-browser-dynamic';
"use strict";
// import {HTTP_PROVIDERS} from '@angular/http';
// import { disableDeprecatedForms, provideForms } from '@angular/forms';
// import {  provide } from '@angular/core';
// // Add these symbols to override the `LocationStrategy`
// import { LocationStrategy,
//     HashLocationStrategy } from '@angular/common';
// import { appRouterProviders } from './main/main.routers';
// import { AppComponent } from './main/main.component';
// import { AuthService } from './user/auth.service';
// import { AuthAdminGuard, AuthGuard } from './user/auth.guard';
// enableProdMode();
// bootstrap(AppComponent, [
//     appRouterProviders,
//     HTTP_PROVIDERS,
//     AuthService,
//     AuthAdminGuard,
//     AuthGuard,
//     disableDeprecatedForms(),
//     provideForms(),
//     { provide: LocationStrategy, useClass: HashLocationStrategy }
// ])
//     .then(success => console.log(`Bootstrap success`))
//     .catch(error => console.log(error));
// The browser platform with a compiler
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
// The app module
var main_module_1 = require('./main/main.module');
// Compile and launch the module
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(main_module_1.AppMainModule)
    .then(function (success) { return console.log("Bootstrap success"); })
    .catch(function (error) { return console.log(error); });

//# sourceMappingURL=boot.js.map
