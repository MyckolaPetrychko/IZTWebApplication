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
require('rxjs/add/operator/do');
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';
var auth_constant_1 = require('./auth.constant');
var user_service_1 = require('./user.service');
var error_handler_function_1 = require('../variable/error-handler.function');
var base64_class_1 = require('../variable/base64.class');
var AuthService = (function () {
    function AuthService(_http, _user) {
        this._http = _http;
        this._user = _user;
    }
    AuthService.prototype.login = function (user, pass) {
        // TODO: FIX md5, ssh???
        var str = 'Basic ' + base64_class_1.Base64.encode(user + ':' + pass);
        var options = new http_1.RequestOptions();
        options.headers = new http_1.Headers();
        options.headers.append('Authorization', str);
        return this._http.get(auth_constant_1.UserLoginApi, options)
            .map(function (data) { return data.json(); })
            .catch(error_handler_function_1.handleError);
    };
    AuthService.prototype.logout = function () {
        this._user.changeUser({});
    };
    AuthService.prototype.getUserList = function () {
        return this._http.get(auth_constant_1.UserListApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserList' +
                '\nUrl: ' + auth_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    AuthService.prototype.getUserId = function (userId) {
        var urlUserIdApi = auth_constant_1.UserIdApi.replace('%userID%', '' + userId);
        return this._http.get(urlUserIdApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserId' +
                '\nUrl: ' + urlUserIdApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    AuthService.prototype.addUser = function (_user) {
        var body = JSON.stringify(_user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(auth_constant_1.UserListApi, body, options)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserAdd' +
                '\nUrl: ' + auth_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    AuthService.prototype.updateUser = function (userId, _newUser) {
        var url = auth_constant_1.UserIdApi.replace('%railcarID%', '' + userId);
        var body = JSON.stringify(_newUser);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url, body, options)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('UserUpdate' +
                '\nUrl: ' + auth_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    AuthService.prototype.deleteUser = function (userId) {
        var url = auth_constant_1.UserIdApi.replace('%railcarID%', '' + userId);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url, options)
            .do(function (data) {
            console.debug('RailcarDelete' +
                '\nUrl: ' + auth_constant_1.UserListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
