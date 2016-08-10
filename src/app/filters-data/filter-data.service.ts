/*
 * @author Марина Усатюк maryna.duda@innovinnprom.com
 * @date 09.08.2016 11:04:00
 *
 * Copyright (c) 2016 ИННОВИННПРОМ
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

} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthService } from '../user/auth.service';
import { handleError } from '../common/variable/error-handler.function';

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

import {IDataModel} from './data.model';

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
     * @param {AuthService} _auth - authenticationServise
     */
    constructor(private _http: Http, private _auth: AuthService) {

    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getSendersList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(SendersApi.url,
            SendersApi.idValue,
            SendersApi.nameValue);
    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getOwnersList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(OwnersApi.url,
            OwnersApi.idValue,
            OwnersApi.nameValue);

    }
    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getProvidersList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(ProvidersApi.url,
            ProvidersApi.idValue,
            ProvidersApi.nameValue);

    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getStoragessList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(StoragesApi.url,
            StoragesApi.idValue,
            StoragesApi.nameValue);
    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getScalesTypeList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(ScalesTypeApi.url,
            ScalesTypeApi.idValue,
            ScalesTypeApi.nameValue);
    }
    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getStationsList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(StationsApi.url,
            StationsApi.idValue,
            StationsApi.nameValue);
    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getCulturesList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(CulturesApi.url,
            CulturesApi.idValue,
            CulturesApi.nameValue);
    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getCultureClassesList(): Observable<IDataModel[]  | string> {
        return this._getFiltersHttp(CulturesClassesApi.url,
            CulturesClassesApi.idValue,
            CulturesClassesApi.nameValue);
    }

    /**
     * 
     * 
     * @returns {(Observable<IDataModel | string>)}
     */
    public getCultureSortesList(): Observable<IDataModel[] | string> {
        return this._getFiltersHttp(CulturesSortesApi.url,
            CulturesSortesApi.idValue,
            CulturesSortesApi.nameValue);
    }

    /**
     * 
     * 
     * @private
     * @param {string} url
     * @param {string} [id=undefined]
     * @param {string} [name=undefined]
     * @returns {(Observable<IDataModel[] | string>)}
     */
    private _getFiltersHttp(url: string,
        id: string = undefined,
        name: string = undefined)
        : Observable<IDataModel[] | string> {
        if (!this._auth.isAuth('user')) {
            return Observable.throw('CONNECTION.USER_NOT_AUTH');
        }

        return this._http.get(url)
            .map(res => <IDataModel[]>(res.json().map((item: { [name: string]: string }): IDataModel => {
                if (id && name) {
                    let _it: IDataModel = <IDataModel>{};
                    _it.id = item[id];
                    _it.name = item[name];
                    return _it;
                }
            })))
            .do((data: IDataModel[]): void => {
                console.debug('Data Filtes:' +
                              '\nUrl: ' + url +
                              '\nData Len: ' + data.length + 
                              '\nData: ' + JSON.stringify(data[0]));
            })
            .catch(handleError);
    }
}
