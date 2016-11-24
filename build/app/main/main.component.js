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
// import {HTTP_PROVIDERS, Http } from '@angular/http';
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
// import { LocalStorageService } from '../common/servises/storage.service';
// import { NotifyService } from '../common/servises/notify.server';
// import { RailcarsComponent } from '../railcars/railcar-main-page/railcars.component';
// import { DataFilterService } from '../filters-data/filter-data.service';
// import { RailcarProvide } from '../railcars/railcars.provide';
var AppMainComponent = (function () {
    function AppMainComponent(router) {
        this.router = router;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var newRoute = event.urlAfterRedirects || '/';
                //    console.log(newRoute);
                ga('send', 'pageview', newRoute);
            }
        });
    }
    AppMainComponent.prototype.ngOnInit = function () {
        // TODO: init
    };
    AppMainComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-main',
            templateUrl: 'main.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppMainComponent);
    return AppMainComponent;
}());
exports.AppMainComponent = AppMainComponent;

//# sourceMappingURL=main.component.js.map
