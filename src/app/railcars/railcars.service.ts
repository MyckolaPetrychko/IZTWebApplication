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
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { IRailcarModel } from './railcars.model';
import {
    RailcarListApi,
    RailcarIdApi
} from './railcars.constant';



/**
 * Service to work with railcars
 * 
 * @export
 * @class RailcarService
 */
@Injectable()
export class RailcarService {
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
    public getRailcarList(): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }

        return this._http.get(RailcarListApi)
            .map(res => <IRailcarModel[]>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarList' +
                    '\nUrl: ' + RailcarListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }


    /**
     * Function to get one railcar selected by id :
     * Http: GET RailcarIdApi
     * 
     * @param {string} railcarId - id by railcar
     * @returns {Observable<IRailcarModel> railcar model }
     */
    public getRailcarId(railcarId: string): Observable<any> {
        if (this._role === 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
        }
        let urlRailcarIdApi = RailcarIdApi.replace('%railcarID%', railcarId);
        return this._http.get(urlRailcarIdApi)
            .map(res => <IRailcarModel>res.json())
            // TODO: #debug | RailcarService
            .do(data => {
                console.debug('RailcarId' +
                    '\nUrl: ' + urlRailcarIdApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
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
    public addRailcar(_railcar: IRailcarModel): Observable<any> {
        // TODO: RailcarService | change to only traider muss add new railcar
        if (this._role !== 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
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
            .catch(this.handleError);
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
    public updateRailcar(_railcar: IRailcarModel): Observable<any> {
        // TODO: RailcarService | change to only traider muss add new railcar
        if (this._role !== 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
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
            .catch(this.handleError);
    }


    /**
     * Function to delete railcar from list:
     * Http: Del RailcarIdApi
     * 
     * @param {string} railcarId - id for delete railcar
     * @returns {Observable<any> - result of delete railcarId }
     */
    public deleteRailcar(railcarId: string): Observable<any> {
        // TODO: RailcarService | change to only traider muss add new railcar
        if (this._role !== 'anonym') {
            // TODO: #translate | RailcarService
            return Observable.throw('User is not authorized');
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

