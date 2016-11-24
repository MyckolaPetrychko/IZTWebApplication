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
var http_1 = require('@angular/http');
require('rxjs/add/observable/throw');
// Operators
require('rxjs/add/operator/catch');
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
require('rxjs/add/operator/map');
var user_roles_model_1 = require('./user-roles.model');
var AuthService = (function () {
    function AuthService(_http) {
        this._http = _http;
        // ROD: remove debug
        this.role = 'admin';
        this._roles = user_roles_model_1.USER_ROLES;
        this._isLogined = true;
    }
    AuthService.prototype.login = function (user, pass) {
        // let _url = UserLoginApi.replace('%login%', user).replace('%password%', pass);
        this.role = user;
        this._isLogined = true;
    };
    AuthService.prototype.isAuth = function (_role) {
        var res;
        if (!this._isLogined) {
            res = false;
        }
        else {
            res = (this._roles[_role].indexOf(this.role) === -1) ? false : true;
        }
        return res;
    };
    AuthService.prototype.logout = function () {
        this.role = 'anonym';
        this._isLogined = false;
    };
    AuthService.prototype.isLogined = function () {
        // console.log('isLogined');
        return this._isLogined;
        //return Observable.of(this._isLogined); 
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
