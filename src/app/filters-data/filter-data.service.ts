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
    SendersApi,
    ProvidersApi,
    OwnersApi,
    StationsApi,
    StoragesApi,
    ScalesTypeApi,
    CulturesApi,
    CulturesClassesApi,
    CulturesSortesApi
} from './filter-data.constant';

import { AuthService } from '../user/auth.service';
export interface IDataModel {
    id: string | number,
    name: string
}


/**
 * Service to work with data filters
 * 
 * @export
 * @class DataFilterService
 */
@Injectable()
export class DataFilterService {

    /**
     * Creates an instance of DataFilterService.
     * 
     * @param {Http} _http - Angular2 http module
     */
    constructor(private _http: Http, private _auth: AuthService) {

    }

    public getSendersList(): Observable<any> {
        return this._getFiltersHttp(SendersApi.url,
            SendersApi.idValue,
            SendersApi.nameValue);

    }
    public getOwnersList(): Observable<any> {
        return this._getFiltersHttp(OwnersApi.url,
            OwnersApi.idValue,
            OwnersApi.nameValue);

    }
    public getProvidersList(): Observable<any> {
        return this._getFiltersHttp(ProvidersApi.url,
            ProvidersApi.idValue,
            ProvidersApi.nameValue);

    }
    public getStoragessList(): Observable<any> {
        return this._getFiltersHttp(StoragesApi.url,
            StoragesApi.idValue,
            StoragesApi.nameValue);
    }

    public getScalesTypeList(): Observable<any> {
        return this._getFiltersHttp(ScalesTypeApi.url,
            ScalesTypeApi.idValue,
            ScalesTypeApi.nameValue);
    }
    public getStationsList(): Observable<any> {
        return this._getFiltersHttp(StationsApi.url,
            StationsApi.idValue,
            StationsApi.nameValue);
    }

    public getCulturesList(): Observable<any> {
        return this._getFiltersHttp(CulturesApi.url,
            CulturesApi.idValue,
            CulturesApi.nameValue);
    }
    public getCultureClassesList(): Observable<any> {
        return this._getFiltersHttp(CulturesClassesApi.url,
            CulturesClassesApi.idValue,
            CulturesClassesApi.nameValue);
    }
    public getCultureSortesList(): Observable<any> {
        return this._getFiltersHttp(CulturesSortesApi.url,
            CulturesSortesApi.idValue,
            CulturesSortesApi.nameValue);
    }


    private _getFiltersHttp(url: string, id: string = undefined, name: string = undefined): Observable<any> {
        if (!this._auth.isAuth('user')) {
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }

        return this._http.get(url)
            .map(res => <IDataModel[]>(res.json().map((item: any) => {
                if (id && name) {
                    let _it: IDataModel;
                        _it.id      = item[id];
                        _it.name    = item[name];
                    return _it;
                }
            })))
            .do((data: any): void => {
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

