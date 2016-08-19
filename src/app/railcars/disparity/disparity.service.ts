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


import { handleError } from '../../shared/variable/error-handler.function';
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

    constructor(private _http: Http) {

    }

    // getDisparityListCurrent(): Observable<IDisparityModel[]> {
    getDisparityListCurrent(): Observable<any> {
          return this._http.get(DisparityListCurrentApi)
            .map(res => <IDisparityModel[]>res.json())
            .do(data => {
                // TODO: debug
                console.debug('Disparity List Current: ' +
                    DisparityListCurrentApi +
                    '\n Data: ' +
                    JSON.stringify(data.length));
            })
            .catch(handleError);
    }

   // TODO: debug only get
    //   setDisparityRailcarAcceptApi(railcarID: string,
    //                                disparityID: string): Observable<IDisparityAcceptModel> {
    setDisparityRailcarAcceptApi(railcarID: string,
        disparityID: string): Observable<any> {

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
            .catch(handleError);
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

}
