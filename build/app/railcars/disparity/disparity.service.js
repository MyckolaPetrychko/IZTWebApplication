/**
 * @author Maryna Duda
 * @email maryna.duda@innovinnprom.com
 * @date   22/06/2016 09:20
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
// Angular
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
// Operators
require('rxjs/add/observable/throw');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
var error_handler_function_1 = require('../../shared/variable/error-handler.function');
var disparity_constant_1 = require('./disparity.constant');
/**
 * Service to work with disparitys
 *
 * @export
 * @class DisparityService
 */
var DisparityService = (function () {
    // private _role: string;
    function DisparityService(_http) {
        this._http = _http;
    }
    // getDisparityListCurrent(): Observable<IDisparityModel[]> {
    DisparityService.prototype.getDisparityListCurrent = function () {
        return this._http.get(disparity_constant_1.DisparityListCurrentApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            // TODO: debug
            console.debug('Disparity List Current: ' +
                disparity_constant_1.DisparityListCurrentApi +
                '\n Data: ' +
                JSON.stringify(data.length));
        })
            .catch(error_handler_function_1.handleError);
    };
    // TODO: debug only get
    //   setDisparityRailcarAcceptApi(railcarID: string,
    //                                disparityID: string): Observable<IDisparityAcceptModel> {
    DisparityService.prototype.setDisparityRailcarAcceptApi = function (railcarID, disparityID) {
        var urlDisparityRailcarAcceptApi = disparity_constant_1.DisparityAcceptApi
            .replace('%railcarId%', railcarID)
            .replace('%disparityId%', disparityID);
        return this._http.get(urlDisparityRailcarAcceptApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            // TODO: debug
            console.debug('Disparity Railcar Accept: ' +
                urlDisparityRailcarAcceptApi +
                '\n Data: ' +
                JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    DisparityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DisparityService);
    return DisparityService;
}());
exports.DisparityService = DisparityService;

//# sourceMappingURL=disparity.service.js.map
