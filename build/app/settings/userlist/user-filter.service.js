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
var DataFilterUserService = (function () {
    function DataFilterUserService(_http) {
        this._http = _http;
        this._role = 'admin';
    }
    DataFilterUserService.prototype.getCompaniesList = function () {
        if (this._role === 'anonym') {
            return Observable_1.Observable.throw('User is not authorized');
        }
        return this._http.get(user_list_constant_1.CompaniesApi)
            .map(function (res) { return res.json().map(function (item) { return item.clientfullname; }); })
            .do(function (data) {
            console.debug('Companies' +
                '\nUrl: ' + user_list_constant_1.CompaniesApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(this.handleError);
    };
    DataFilterUserService.prototype.handleError = function (err) {
        var message;
        if (err.message) {
            message = err.message;
        }
        else {
            message = (err.status) ?
                err.status + " : " + err.statusText :
                'Server connection error';
        }
        //console.error(message);
        return Observable_1.Observable.throw(message);
    };
    DataFilterUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataFilterUserService);
    return DataFilterUserService;
}());
exports.DataFilterUserService = DataFilterUserService;

//# sourceMappingURL=user-filter.service.js.map
