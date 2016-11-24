"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// import { BrowserModule } from '@angular/platform-browser';
var main_component_1 = require('./main.component');
// import { FormsModule }         from '@angular/forms';
// import {  Http } from '@angular/http';
// import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
var core_2 = require('@angular/core');
var shared_module_1 = require('../shared/shared.module');
var railcar_module_1 = require('../railcars/railcar.module');
var settings_module_1 = require('../settings/settings.module');
var user_module_1 = require('../user/user.module');
var main_routers_1 = require('./main.routers');
var main_routers_2 = require('./main.routers');
core_2.enableProdMode();
var AppMainModule = (function () {
    function AppMainModule() {
    }
    AppMainModule = __decorate([
        core_1.NgModule({
            imports: [
                // BrowserModule,
                // FormsModule,
                main_routers_2.routing,
                shared_module_1.SharedModule.forRoot(),
                railcar_module_1.RailcarsModule,
                settings_module_1.SettingsModule,
                user_module_1.UserModule
            ],
            declarations: [main_component_1.AppMainComponent],
            providers: main_routers_1.routerProviders.slice(),
            bootstrap: [main_component_1.AppMainComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppMainModule);
    return AppMainModule;
}());
exports.AppMainModule = AppMainModule;

//# sourceMappingURL=main.module.js.map
