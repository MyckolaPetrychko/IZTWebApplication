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

import { IAuthUser } from '../../shared/auth/auth-user.model';
import {
    CompaniesApi
} from './user-list.constant';

@Injectable()
export class DataFilterUserService {

    private _role: string;

    constructor(private _http: Http) {
        this._role = 'admin';
    }

    public getCompaniesList(): Observable<any> {
        if (this._role === 'anonym') {
            return Observable.throw('User is not authorized');
        }

        return this._http.get(CompaniesApi)
            .map(res => <string[]>res.json().map((item: any) => item.clientfullname))
            .do(data => {
                console.debug('Companies' +
                    '\nUrl: ' + CompaniesApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    private handleError(err: any): Observable<string> {
        let message: string;
        if (err.message) {
            message = err.message;
        } else {
            message = (err.status) ?
                `${err.status} : ${err.statusText}` :
                'Server connection error';
        }

        //console.error(message);
        return Observable.throw(message);
    }
}

