/**
 * @author Maryna Duda maryna.duda@innovinnpromm.com
 * @date 23.06.2016 13:39:10
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
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
// import 'rxjs/add/operator/distinctUntilChanged';
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
var railcars_constant_1 = require('./railcars.constant');
var auth_service_1 = require('../../../../shared/auth/auth.service');
var error_handler_function_1 = require('../../../../shared/variable/error-handler.function');
/**
 * Service to work with railcars
 *
 * @export
 * @class RailcarService
 */
var RailcarService = (function () {
    /**
     * Creates an instance of RailcarService.
     *
     * @param {Http} _http - Angular2 http module
     * @param {AuthService} _auth - authen service
     */
    function RailcarService(_http, _auth) {
        this._http = _http;
        this._auth = _auth;
        // TODO: RailcarService | check roles as constant
    }
    /**
     * Function to get list of railcars :
     * Http: GET RailcarListApi
     *
     * @returns {Observable<IRailcarModel[]> array of railcars}
     */
    RailcarService.prototype.getRailcarList = function (_begindate, _enddate, _astorageid, _showallowners, _shownotreceived, _showweighted, _showremoterecords, _showdeleted, _filter_transportnumber, _filter_invoicenumber, _filter_sendernname, _filter_stationname, _filter_cropname) {
        if (_begindate === void 0) { _begindate = 1; }
        if (_enddate === void 0) { _enddate = null; }
        if (_astorageid === void 0) { _astorageid = 1; }
        if (_showallowners === void 0) { _showallowners = 0; }
        if (_shownotreceived === void 0) { _shownotreceived = 0; }
        if (_showweighted === void 0) { _showweighted = 0; }
        if (_showremoterecords === void 0) { _showremoterecords = 0; }
        if (_showdeleted === void 0) { _showdeleted = 0; }
        if (_filter_transportnumber === void 0) { _filter_transportnumber = ''; }
        if (_filter_invoicenumber === void 0) { _filter_invoicenumber = ''; }
        if (_filter_sendernname === void 0) { _filter_sendernname = ''; }
        if (_filter_stationname === void 0) { _filter_stationname = ''; }
        if (_filter_cropname === void 0) { _filter_cropname = ''; }
        var params = new http_1.URLSearchParams();
        if (_begindate) {
            params.set('begindate', '' + _begindate);
        }
        if (_enddate) {
            params.set('enddate', '' + _enddate);
        }
        if (_astorageid) {
            params.set('astorageid', '' + _astorageid);
        }
        if (_showallowners) {
            params.set('showallowners', '' + _showallowners);
        }
        if (_shownotreceived) {
            params.set('shownotreceived', '' + _shownotreceived);
        }
        if (_showweighted) {
            params.set('showweighted', '' + _showweighted);
        }
        if (_showremoterecords) {
            params.set('showremoterecords', '' + _showremoterecords);
        }
        if (_showdeleted) {
            params.set('showdeleted', '' + _showdeleted);
        }
        if (_filter_transportnumber !== '') {
            params.set('filter_transportnumber', _filter_transportnumber);
        }
        if (_filter_invoicenumber !== '') {
            params.set('filter_invoicenumber', _filter_invoicenumber);
        }
        if (_filter_sendernname !== '') {
            params.set('filter_sendernname', _filter_sendernname);
        }
        if (_filter_stationname !== '') {
            params.set('filter_stationname', _filter_stationname);
        }
        if (_filter_cropname !== '') {
            params.set('filter_cropname', _filter_cropname);
        }
        return this._http.get(railcars_constant_1.RailcarListApi, { search: params })
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('RailcarList' +
                '\nUrl: ' + railcars_constant_1.RailcarListApi +
                '\nData Len: ' + data.length +
                '\nData: ' + JSON.stringify(data[0]));
        })
            .catch(error_handler_function_1.handleError);
    };
    RailcarService.prototype.getRailcarDisparityList = function (railcarId) {
        var urlRailcarIdDisparityApi = railcars_constant_1.RailcarIdDisparityApi.replace('%railcarID%', railcarId);
        return this._http.get(urlRailcarIdDisparityApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('RailcarIdDisparityApi' +
                '\nUrl: ' + urlRailcarIdDisparityApi +
                '\nData: ' + JSON.stringify(data.length));
        })
            .catch(error_handler_function_1.handleError);
    };
    /**
     * Function to get one railcar selected by id :
     * Http: GET RailcarIdApi
     *
     * @param {string} railcarId - id by railcar
     * @returns {Observable<IRailcarModel> railcar model }
     */
    RailcarService.prototype.getRailcarId = function (railcarId) {
        var urlRailcarIdApi = railcars_constant_1.RailcarIdApi.replace('%railcarID%', railcarId);
        return this._http.get(urlRailcarIdApi)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('RailcarId' +
                '\nUrl: ' + urlRailcarIdApi + '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    /**
     * Function to add new railcar to list (only for traiders):
     * Http: POST RailcarListApi
     *       Body : IRailcarModel
     *       Headers: 'Content-Type': 'application/json'
     *
     * @param {IRailcarModel} _railcar - model of railcar where add
     * @returns {Observable<any>} - result of adding: _railcar with id || only id
     */
    RailcarService.prototype.addRailcar = function (_railcar) {
        var body = JSON.stringify(_railcar);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(railcars_constant_1.RailcarListApi, body, options)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('RailcarAdd' +
                '\nUrl: ' + railcars_constant_1.RailcarListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    /**
     * Function to update data of railcar by id (only for traiders):
     * Http: Put RailcarIdApi
     *       Body : IRailcarModel
     *       Headers: 'Content-Type': 'application/json'
     *
     * @param {IRailcarModel} _railcar  - updated model of railcar
     * @returns {Observable<any>}       - result of update _railcar
     */
    RailcarService.prototype.updateRailcar = function (_railcar) {
        // TODO:  RailcarService | check id by railcar
        var url = railcars_constant_1.RailcarIdApi.replace('%railcarID%', _railcar.transportnumber);
        var body = JSON.stringify(_railcar);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url, body, options)
            .map(function (res) { return res.json(); })
            .do(function (data) {
            console.debug('RailcarAdd' +
                '\nUrl: ' + railcars_constant_1.RailcarListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    /**
     * Function to delete railcar from list:
     * Http: Del RailcarIdApi
     *
     * @param {string} railcarId - id for delete railcar
     * @returns {Observable<any> - result of delete railcarId }
     */
    RailcarService.prototype.deleteRailcar = function (railcarId) {
        var url = railcars_constant_1.RailcarIdApi.replace('%railcarID%', railcarId);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url, options)
            .do(function (data) {
            console.debug('RailcarAdd' +
                '\nUrl: ' + railcars_constant_1.RailcarListApi +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    /**
     * Api to parse xml file railcar into json IRailcarModel
     *
     * @param {string} file - xml file
     * @returns {Observable<any>} - parset json
     */
    RailcarService.prototype.getRailcarFile = function (file) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/xml' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(file);
        return this._http.get(railcars_constant_1.RailcarFileApi, options).debounceTime(5000)
            .map(function (data) { return data.text(); })
            .do(function (data) {
            console.debug('RailcarFileApi' +
                '\nUrl: ' + railcars_constant_1.RailcarFileApi +
                '\nData Len: ' + 1 +
                '\nData: ' + JSON.stringify(data));
        })
            .catch(error_handler_function_1.handleError);
    };
    RailcarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], RailcarService);
    return RailcarService;
}());
exports.RailcarService = RailcarService;

//# sourceMappingURL=railcars.service.js.map
