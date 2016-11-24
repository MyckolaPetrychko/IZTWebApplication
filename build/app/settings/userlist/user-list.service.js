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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
var user_list_constant_1 = require('./user-list.constant');
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this._role = 'admin';
    }
    UserService.prototype.getUserList = function () {
        if (this._role === 'anonym') {
            return Observable_1.Observable.throw('User is not authorized');
        }
        return this._http.get(user_list_constant_1.UserListApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserList' +
                '\nUrl: ' + user_list_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(this.handleError);
    };
    UserService.prototype.getUserId = function (userId) {
        if (this._role === 'anonym') {
            return Observable_1.Observable.throw('User is not authorized');
        }
        var urlUserIdApi = user_list_constant_1.UserIdApi.replace('%userID%', userId);
        return this._http.get(urlUserIdApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserId' +
                '\nUrl: ' + urlUserIdApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(this.handleError);
    };
    UserService.prototype.addUser = function (_user) {
        if (this._role !== 'anonym') {
            return Observable_1.Observable.throw('User is not authorized');
        }
        var body = JSON.stringify(_user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(user_list_constant_1.UserListApi, body, options)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserAdd' +
                '\nUrl: ' + user_list_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (_newUser) {
        if (this._role !== 'anonym') {
            return Observable_1.Observable.throw('User is not authorized');
        }
        var body = JSON.stringify(_newUser);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(user_list_constant_1.UserListApi, body, options)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserUpdate' +
                '\nUrl: ' + user_list_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(this.handleError);
    };
    UserService.prototype.deleteUser = function (userId) {
        if (this._role !== 'anonym') {
            return Observable_1.Observable.throw('User is not authorized');
        }
        var url = user_list_constant_1.UserIdApi.replace('%userID%', userId);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url, options)
            .do(function (data) {
            console.debug('UserDelete' +
                '\nUrl: ' + user_list_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (err) {
        var message;
        if (err.message) {
            message = err.message;
        }
        else {
            message = (err.status) ?
                err.status + " : " + err.statusText :
                'Server connection error';
        }
        console.error(message);
        return Observable_1.Observable.throw(message);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

//# sourceMappingURL=user-list.service.js.map
