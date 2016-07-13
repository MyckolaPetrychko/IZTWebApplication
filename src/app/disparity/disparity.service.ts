/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnprom.com
 * @date   22/06/2016 09:20
 */

// Angular
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

import {  Observable } from 'rxjs/Observable';
// Operators
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';



// Application
import {
    IDisparityModel,
    IDisparityAcceptModel
} from './disparity.model';
import {
    DisparityListCurrentApi,
    DisparityRailcarApi,
    DisparityRailcarAcceptApi
} from './disparity.constant';

/**
 * Service to work with disparitys 
 * 
 * @export
 * @class DisparityService
 */
@Injectable()
export class DisparityService {
    private _role: string;

    constructor(private _http: Http) {
        this._role = 'admin';
    }

    // getDisparityListCurrent(): Observable<IDisparityModel[]> {
    getDisparityListCurrent(): Observable<any> {
        if (this._role === 'anonym') { return; }
        return this._http.get(DisparityListCurrentApi)
            .map(this.extractData)
            .do(data => {
                // TODO: debug
                console.debug('Disparity List Current: ' +
                    DisparityListCurrentApi +
                    '\n Data: ' +
                    JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    // getDisparityRaicar(railcarID: string): Observable<IDisparityModel> {
    getDisparityRaicar(railcarID: string): Observable<any> {
        if (this._role === 'anonym') { return; }

        let disparityRailcarApi = DisparityRailcarApi
            .replace('%railcarId%', railcarID);

        return this._http.get(disparityRailcarApi)
            .map(res => <IDisparityModel[]>res.json())
            .do(data => {
                // TODO: debug
                console.debug(
                    'Disparity Railcar: ' +
                    DisparityRailcarApi +
                    '\n Data: ' +
                    JSON.stringify(data)
                );
            })
            .catch(this.handleError);
    }

    // TODO: debug only get
    //   setDisparityRailcarAcceptApi(railcarID: string,
    //                                disparityID: string): Observable<IDisparityAcceptModel> {
    setDisparityRailcarAcceptApi(railcarID: string,
        disparityID: string): Observable<any> {
        if (this._role === 'anonym') { return; }

        let disparityRailcarAcceptApi = DisparityRailcarAcceptApi
            .replace('%railcarId%', railcarID)
            .replace('%disparityId%', disparityID);
        return this._http.get(disparityRailcarAcceptApi)
            .map(res => <IDisparityAcceptModel>res.json())
            .do(data => {
                // TODO: debug
                console.debug('Disparity Railcar Accept: ' +
                    DisparityRailcarAcceptApi +
                    '\n Data: ' +
                    JSON.stringify(data));
            })
            .catch(this.handleError);
    }
    /*   
     // PUT 
     setDisparityRailcarAcceptApi(railcarID: string, disparityID: string): Observable<IDisparityAcceptModel> {
         if (this._role === 'anonym') { return;}
 
         let disparityRailcarAcceptApi = DisparityRailcarAcceptApi
             .replace('%railcarId%', railcarID)
             .replace('%disparityId%', disparityID);
 
         let body = JSON.stringify(disparityID);
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
 
         return this._http.put(disparityRailcarAcceptApi, body, options)
             .map(res => <IDisparityAcceptModel>res.json().data)
             .do(data => {
                 // TODO: debug
                 console.debug('Disparity Railcar Accept: ' +
                     DisparityRailcarAcceptApi +
                     '\n Data: ' +
                     JSON.stringify(data));
             })
             .catch(this.handleError);
     }
 */
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(err: any): Observable<Response> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (err.message) ? err.message :
            err.status ? `${err.status} - ${err.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
