/**
 * @author Maryna Duda maryna.duda@innovinnpromm.com
 * @date 23.06.2016 13:39:10
 */

import {
    Injectable,
    Optional
} from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions,
    URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { IRailcarModel } from '../../../railcars-subcomponents/railcar-list/railcars-list.model';
import { IRailcarEditModel } from '../../../railcars-subcomponents/railcar-edit/railcar-edit.model';
import { IRailcarDisparityModel } from '../../../railcars-subcomponents/railcar-disparity/railcar-disparity.model';
import {
    RailcarListApi,
    RailcarIdApi,
    RailcarIdDisparityApi,
    RailcarFileApi
} from './railcars.constant';

import { AuthService } from '../../../../shared/auth/auth.service';
import { handleError } from '../../../../shared/variable/error-handler.function';

/**
 * Service to work with railcars
 * 
 * @export
 * @class RailcarService
 */
@Injectable()
export class RailcarService {
    /**
     * Creates an instance of RailcarService.
     * 
     * @param {Http} _http - Angular2 http module
     * @param {AuthService} _auth - authen service
     */
    constructor(private _http: Http, private _auth: AuthService) {
        // TODO: RailcarService | check roles as constant
    }


    /**
     * Function to get list of railcars :
     * Http: GET RailcarListApi
     * 
     * @returns {Observable<IRailcarModel[]> array of railcars}
     */
    public getRailcarList(_begindate: number = 1,
        _enddate: number = null,

        _astorageid: number = 1,
        _showallowners: number = 0,

        _shownotreceived: number = 0,
        _showweighted: number = 0,
        _showremoterecords: number = 0,
        _showdeleted: number = 0,

        _filter_transportnumber: string = '',
        _filter_invoicenumber: string = '',
        _filter_sendernname: string = '',
        _filter_stationname: string = '',
        _filter_cropname: string = ''
    ): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();

        if (_begindate) { params.set('begindate', '' + _begindate); }
        if (_enddate) { params.set('enddate', '' + _enddate); }

        if (_astorageid) { params.set('astorageid', '' + _astorageid); }
        if (_showallowners) { params.set('showallowners', '' + _showallowners); }

        if (_shownotreceived) { params.set('shownotreceived', '' + _shownotreceived); }
        if (_showweighted) { params.set('showweighted', '' + _showweighted); }
        if (_showremoterecords) { params.set('showremoterecords', '' + _showremoterecords); }
        if (_showdeleted) { params.set('showdeleted', '' + _showdeleted); }

        if (_filter_transportnumber !== '') { params.set('filter_transportnumber', _filter_transportnumber); }
        if (_filter_invoicenumber !== '') { params.set('filter_invoicenumber', _filter_invoicenumber); }
        if (_filter_sendernname !== '') { params.set('filter_sendernname', _filter_sendernname); }
        if (_filter_stationname !== '') { params.set('filter_stationname', _filter_stationname); }
        if (_filter_cropname !== '') { params.set('filter_cropname', _filter_cropname); }


        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }

        return this._http.get(RailcarListApi, { search: params })
            .map(res => <IRailcarModel[]>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarList' +
                            '\nUrl: ' + RailcarListApi +
                            '\nData Len: ' + data.length + 
                              '\nData: ' + JSON.stringify(data[0]));
            })
            .catch(handleError);
    }


    public getRailcarDisparityList(railcarId: string): Observable<any> {
        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }

        let urlRailcarIdDisparityApi = RailcarIdDisparityApi.replace('%railcarID%', railcarId);

        return this._http.get(urlRailcarIdDisparityApi)
            .map(res => <IRailcarDisparityModel[]>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarIdDisparityApi' +
                    '\nUrl: ' + urlRailcarIdDisparityApi +
                    '\nData: ' + JSON.stringify(data.length));
            })
            .catch(handleError);
    }

    /**
     * Function to get one railcar selected by id :
     * Http: GET RailcarIdApi
     * 
     * @param {string} railcarId - id by railcar
     * @returns {Observable<IRailcarModel> railcar model }
     */
    public getRailcarId(railcarId: string): Observable<any> {
        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }
        let urlRailcarIdApi = RailcarIdApi.replace('%railcarID%', railcarId);
        return this._http.get(urlRailcarIdApi)
            .map(res => <IRailcarModel>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarId' +
                    '\nUrl: ' + urlRailcarIdApi + '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }


    /**
     * Function to add new railcar to list (only for traiders):
     * Http: POST RailcarListApi
     *       Body : IRailcarModel
     *       Headers: 'Content-Type': 'application/json'
     * 
     * @param {IRailcarModel} _railcar - model of railcar where add
     * @returns {Observable<any>} - result of adding: _railcar with id || only id
     */
    public addRailcar(_railcar: IRailcarEditModel): Observable<any> {
        // TODO: RailcarService | change to only traider muss add new railcar
        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }
        if (!this._auth.isAuth('trader')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_IS_NOT_TRADER');
        }
        let body = JSON.stringify(_railcar);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(RailcarListApi, body, options)
            .map(res => <IRailcarModel>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarAdd' +
                    '\nUrl: ' + RailcarListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }


    /**
     * Function to update data of railcar by id (only for traiders):
     * Http: Put RailcarIdApi
     *       Body : IRailcarModel
     *       Headers: 'Content-Type': 'application/json'
     * 
     * @param {IRailcarModel} _railcar  - updated model of railcar
     * @returns {Observable<any>}       - result of update _railcar 
     */
    public updateRailcar(_railcar: IRailcarEditModel): Observable<any> {
        // TODO: RailcarService | change to only traider muss add new railcar
        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }
        if (!this._auth.isAuth('trader')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_IS_NOT_TRADER');
        }
        // TODO:  RailcarService | check id by railcar
        let url = RailcarIdApi.replace('%railcarID%', _railcar.transportnumber);
        let body = JSON.stringify(_railcar);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(url, body, options)
            .map(res => <IRailcarModel>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarAdd' +
                    '\nUrl: ' + RailcarListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }


    /**
     * Function to delete railcar from list:
     * Http: Del RailcarIdApi
     * 
     * @param {string} railcarId - id for delete railcar
     * @returns {Observable<any> - result of delete railcarId }
     */
     
    public deleteRailcar(railcarId: string): Observable<any> {
        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }
        if (!this._auth.isAuth('trader')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_IS_NOT_TRADER');
        }
        let url = RailcarIdApi.replace('%railcarID%', railcarId);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(url, options)
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarAdd' +
                    '\nUrl: ' + RailcarListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }

    /**
     * Api to parse xml file railcar into json IRailcarModel
     * 
     * @param {string} file - xml file 
     * @returns {Observable<any>} - parset json
     */
    public getRailcarFile(file: string): Observable<any> {
        if (!this._auth.isAuth('user')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }
        if (!this._auth.isAuth('trader')) {
            // TODO: #translate | RailcarService
            return Observable.throw('CONNECTION.USER_IS_NOT_TRADER');
        }
        let headers = new Headers({ 'Content-Type': 'application/xml' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(file);

        return this._http.get(RailcarFileApi, options).debounceTime(5000)
        .map((data: Response): string => { return data.text(); })
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarFileApi' +
                              '\nUrl: ' + RailcarFileApi +
                              '\nData Len: ' + 1 + 
                              '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
        // return this._http.post(RailcarFileApi, body, options)
        //     // TODO: #debug | RailcarService
        //     .do(data => {
        //         console.debug('RailcarFileApi' +
        //                       '\nUrl: ' + RailcarFileApi +
        //                       '\nData Len: ' + 1 + 
        //                       '\nData: ' + JSON.stringify(data));
        //     })
        //     .catch(handleError);
    }

}
