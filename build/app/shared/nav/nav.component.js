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
var router_1 = require('@angular/router');
var ng2_translate_1 = require('ng2-translate');
var auth_service_1 = require('../../user/auth.service');
var button_active_directive_1 = require('../button/button-active.directive');
var NavComponent = (function () {
    function NavComponent(auth) {
        this.auth = auth;
        this.isAuth = true;
        this.navlink = [];
    }
    NavComponent.prototype.ngOnInit = function () {
        this.isAuth = false;
        this.navlink = [true, false, false, false];
    };
    NavComponent.prototype.isLogined = function () {
        // optimize;
        //this.auth.isLogined().subscribe((res) => { this.isAuth = res});
        return this.auth.isLogined();
    };
    NavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-nav',
            templateUrl: 'nav.component.html',
            styleUrls: ['nav.component.css'],
            directives: [button_active_directive_1.WblgBtnActiveDirective, router_1.ROUTER_DIRECTIVES],
            pipes: [ng2_translate_1.TranslatePipe]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;

//# sourceMappingURL=nav.component.js.map
