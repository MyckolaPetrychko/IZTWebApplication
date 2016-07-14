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
    RequestOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IRailcarModel } from './railcars.model';
import {
    SendersApi, CulturesApi, StationsApi

} from './railcars.constant';



/**
 * Service to work with railcars
 * 
 * @export
 * @class RailcarService
 */
@Injectable()
export class DataFilterRailcarService {
    /**
     * Property to role of current user
     * 
     * @private
     * @type {string}
     */
    private _role: string;


    /**
     * Creates an instance of RailcarService.
     * 
     * @param {Http} _http - Angular2 http module
     */
    constructor(private _http: Http) {
        // TODO: RailcarService | check roles as constant
        this._role = 'admin';
    }


    /**
     * Function to get list of railcars :
     * Http: GET RailcarListApi
     * 
     * @returns {Observable<IRailcarModel[]> array of railcars}
     */
    public getStationsList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }

        return this._http.get(StationsApi)
            .map(res => <string[]>res.json().map((item: any) => item.stationname))
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('Stations' +
                    '\nUrl: ' + StationsApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }



    public getSendersList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }

        return this._http.get(SendersApi)
            .map(res => <string[]>res.json().map((item: any) => item.clientfullname))
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('Senders' +
                    '\nUrl: ' + SendersApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    public getCulturesList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }

        return this._http.get(CulturesApi)
            .map(res => <string[]>res.json().map((item: any) => item.cropname))
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('Cultures' +
                    '\nUrl: ' + CulturesApi +
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

