/**
 * @author Maryna Duda maryna.duda@innovinnpromm.com
 * @date 18.07.2016 14:11:07
 */

import {
    Injectable,
    Optional
} from '@angular/core';

import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
    SendersApi, CulturesApi, StationsApi

} from './filter-data.constant';



/**
 * Service to work with data filters
 * 
 * @export
 * @class DataFilterService
 */
@Injectable()
export class DataFilterService {
    /**
     * Property to role of current user
     * 
     * @private
     * @type {string}
     */
    private _role: string;


    /**
     * Creates an instance of DataFilterService.
     * 
     * @param {Http} _http - Angular2 http module
     */
    constructor(private _http: Http) {
        // TODO: RailcarService | check roles as constant
        this._role = 'admin';
    }


    public getStationsList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }

        return this._getFiltersHttp(StationsApi.url, StationsApi.filterValue);
    }

    public getSendersList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }
    }

    public getCulturesList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }
        return this._getFiltersHttp(CulturesApi.url, CulturesApi.filterValue);
    }



    private _getFiltersHttp(url:string, value: string = undefined) {
            return this._http.get(url)
            .map(res => <string[]>res.json().map((item: any) => (value === undefined) ? item :  item[value]))
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('Data Filtes' +
                    '\nUrl: ' + url +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    /**
     * Function to handle all errors connection to server
     * 
     * @private
     * @param {*} err - error as result request to server
     * @returns {Observable<string> - text of error}
     */
    private handleError(err: any): Observable<string> {
        // TODO: #translate | RailcarService
        let message: string;
        if (err.message) {
            message = err.message;
        } else {
            message = (err.status) ?
                `${err.status} : ${err.statusText}` :
                'Server connection error';
        }

        console.error(message);
        return Observable.throw(message);
    }
}

