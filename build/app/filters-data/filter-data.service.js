/*
 * @author Марина Усатюк maryna.duda@innovinnprom.com
 * @date 09.08.2016 11:04:00
 *
 * Copyright (c) 2016 ИННОВИННПРОМ
 */
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
var auth_service_1 = require('../user/auth.service');
var error_handler_function_1 = require('../common/variable/error-handler.function');
var filter_data_constant_1 = require('./filter-data.constant');
/**
 * Service to work with data filters
 *
 * @export
 * @class DataFilterService
 */
var DataFilterService = (function () {
    /**
     * Creates an instance of DataFilterService.
     *
     * @param {Http} _http - Angular2 http module
     * @param {AuthService} _auth - authenticationServise
     */
    function DataFilterService(_http, _auth) {
        this._http = _http;
        this._auth = _auth;
    }
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getSendersList = function () {
        return this._getFiltersHttp(filter_data_constant_1.SendersApi.url, filter_data_constant_1.SendersApi.idValue, filter_data_constant_1.SendersApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getOwnersList = function () {
        return this._getFiltersHttp(filter_data_constant_1.OwnersApi.url, filter_data_constant_1.OwnersApi.idValue, filter_data_constant_1.OwnersApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getProvidersList = function () {
        return this._getFiltersHttp(filter_data_constant_1.ProvidersApi.url, filter_data_constant_1.ProvidersApi.idValue, filter_data_constant_1.ProvidersApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getStoragessList = function () {
        return this._getFiltersHttp(filter_data_constant_1.StoragesApi.url, filter_data_constant_1.StoragesApi.idValue, filter_data_constant_1.StoragesApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getScalesTypeList = function () {
        return this._getFiltersHttp(filter_data_constant_1.ScalesTypeApi.url, filter_data_constant_1.ScalesTypeApi.idValue, filter_data_constant_1.ScalesTypeApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getStationsList = function () {
        return this._getFiltersHttp(filter_data_constant_1.StationsApi.url, filter_data_constant_1.StationsApi.idValue, filter_data_constant_1.StationsApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getCulturesList = function () {
        return this._getFiltersHttp(filter_data_constant_1.CulturesApi.url, filter_data_constant_1.CulturesApi.idValue, filter_data_constant_1.CulturesApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getCultureClassesList = function () {
        return this._getFiltersHttp(filter_data_constant_1.CulturesClassesApi.url, filter_data_constant_1.CulturesClassesApi.idValue, filter_data_constant_1.CulturesClassesApi.nameValue);
    };
    /**
     *
     *
     * @returns {(Observable<IDataModel | string>)}
     */
    DataFilterService.prototype.getCultureSortesList = function () {
        return this._getFiltersHttp(filter_data_constant_1.CulturesSortesApi.url, filter_data_constant_1.CulturesSortesApi.idValue, filter_data_constant_1.CulturesSortesApi.nameValue);
    };
    /**
     *
     *
     * @private
     * @param {string} url
     * @param {string} [id=undefined]
     * @param {string} [name=undefined]
     * @returns {(Observable<IDataModel[] | string>)}
     */
    DataFilterService.prototype._getFiltersHttp = function (url, id, name) {
        if (id === void 0) { id = undefined; }
        if (name === void 0) { name = undefined; }
        if (!this._auth.isAuth('user')) {
            return Observable_1.Observable.throw('CONNECTION.USER_NOT_AUTH');
        }
        return this._http.get(url)
            .map(function (res) { return (res.json().map(function (item) {
            if (id && name) {
                var _it = {};
                _it.id = item[id];
                _it.name = item[name];
                return _it;
            }
        })); })
            .do(function (data) {
            console.debug('Data Filtes:' +
                '\nUrl: ' + url +
                '\nData Len: ' + data.length +
                '\nData: ' + JSON.stringify(data[0]));
        })
            .catch(error_handler_function_1.handleError);
    };
    DataFilterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], DataFilterService);
    return DataFilterService;
}());
exports.DataFilterService = DataFilterService;

//# sourceMappingURL=filter-data.service.js.map
