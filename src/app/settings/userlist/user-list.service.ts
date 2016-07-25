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

import { IAuthUser } from './user-list.model';
import {
    UserListApi,
    UserIdApi
} from './user-list.constant';

@Injectable()
export class UserService {
    private _role: string;

    constructor(private _http: Http) {
        this._role = 'admin';
    }
    
    getUserList(): Observable<any> {
            if (this._role === 'anonym') {
            return Observable.throw('User is not authorized');
        }

        return this._http.get(UserListApi)
            .map(res => <IAuthUser[]>res.json())
            .do(data => {
                console.debug('UserList' +
                    '\nUrl: ' + UserListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    public getUserId(userId: string): Observable<any> {
        if (this._role === 'anonym') {
            return Observable.throw('User is not authorized');
        }
        let urlUserIdApi = UserIdApi.replace('%userID%', userId);
        return this._http.get(urlUserIdApi)
            .map(res => <IAuthUser>res.json())
            .do(data => {
                console.debug('UserId' +
                    '\nUrl: ' + urlUserIdApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    public addUser(_user: IAuthUser): Observable<any> {
        if (this._role !== 'anonym') {
            return Observable.throw('User is not authorized');
        }
        let body = JSON.stringify(_user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(UserListApi, body, options)
            .map(res => <IAuthUser>res.json())
            .do(data => {
                console.debug('UserAdd' +
                    '\nUrl: ' + UserListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

    public updateUser(_newUser: IAuthUser): Observable<any> {
        if (this._role !== 'anonym') {
            return Observable.throw('User is not authorized');
        }
        let body = JSON.stringify(_newUser);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(UserListApi, body, options)
            .map(res => <IAuthUser>res.json())
            .do(data => {
                console.debug('UserUpdate' +
                    '\nUrl: ' + UserListApi +       
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(this.handleError);
    }

        public deleteUser(userId: string): Observable<any> {
        if (this._role !== 'anonym') {
            return Observable.throw('User is not authorized');
        }
        let url = UserIdApi.replace('%railcarID%', userId);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(url, options)
            .do(data => {
                console.debug('RailcarDelete' +
                    '\nUrl: ' + UserListApi +
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

        console.error(message);
        return Observable.throw(message);
    }
}