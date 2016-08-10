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


import { AuthService } from '../../user/auth.service';
// Application
import {
    IDisparityModel
} from './disparity.model';
import {
    DisparityListCurrentApi,
    DisparityAcceptApi
} from './disparity.constant';

/**
 * Service to work with disparitys 
 * 
 * @export
 * @class DisparityService
 */
@Injectable()
export class DisparityService {
    // private _role: string;

    constructor(private _http: Http, private _auth : AuthService) {

    }

    // getDisparityListCurrent(): Observable<IDisparityModel[]> {
    getDisparityListCurrent(): Observable<any> {
        if (!this._auth.isAuth('user')) {
             return Observable.throw('CONNECTION.USERISNOTAUTH'); 
       }
        return this._http.get(DisparityListCurrentApi)
            .map(res => <IDisparityModel[]>res.json())
            .do(data => {
                // TODO: debug
                console.debug('Disparity List Current: ' +
                    DisparityListCurrentApi +
                    '\n Data: ' +
                    JSON.stringify(data.length));
            })
            .catch(this.handleError);
    }

   // TODO: debug only get
    //   setDisparityRailcarAcceptApi(railcarID: string,
    //                                disparityID: string): Observable<IDisparityAcceptModel> {
    setDisparityRailcarAcceptApi(railcarID: string,
        disparityID: string): Observable<any> {
        if (!this._auth.isAuth('user')) {
             return Observable.throw('CONNECTION.USERISNOTAUTH'); 
          }

        let urlDisparityRailcarAcceptApi = DisparityAcceptApi
            .replace('%railcarId%', railcarID)
            .replace('%disparityId%', disparityID);


        return this._http.get(urlDisparityRailcarAcceptApi)
            .map(res => <IDisparityModel>res.json())
            .do(data => {
                // TODO: debug
                console.debug('Disparity Railcar Accept: ' +
                    urlDisparityRailcarAcceptApi +
                    '\n Data: ' +
                    JSON.stringify(data));
            })
            .catch(this.handleError);
    }
    /*   
     // PUT 
     setDisparityRailcarAcceptApi(railcarID: string, disparityID: string): Observable<IDisparityModel> {
         if (this._role === 'anonym') { return;}
 
         let disparityRailcarAcceptApi = DisparityRailcarAcceptApi
             .replace('%railcarId%', railcarID)
             .replace('%disparityId%', disparityID);
 
         let body = JSON.stringify(disparityID);
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
 
         return this._http.put(disparityRailcarAcceptApi, body, options)
             .map(res => <IDisparityModel>res.json().data)
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

    private handleError(err: any): Observable<Response> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (err.message) ? err.message :
            err.status ? `${err.status} - ${err.statusText}` : 'CONNECTION.SERVER_ERROR';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
