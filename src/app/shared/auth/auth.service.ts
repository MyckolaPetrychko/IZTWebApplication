import { Injectable, Inject } from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';


// Statics
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';


import { UserLoginApi, UserLogoutApi, UserIdApi, UserListApi } from './auth.constant';
import { UserService } from './user.service';
import { IAuthUser } from './auth-user.model';
import { USER_ROLES, IUserRoles } from './user-roles.model';

import { handleError } from '../variable/error-handler.function';
import { Base64 } from '../variable/base64.class';

@Injectable()
export class AuthService {
    constructor(
        private _http: Http,
        private _user: UserService) {

    }

    public login(user: string, pass: string): Observable<IAuthUser | string> {
        // TODO: FIX md5, ssh???
        var str: string = 'Basic ' + Base64.encode(user + ':' + pass);
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', str);

        return this._http.get(UserLoginApi, options)
            .map((data: Response): IAuthUser => { return <IAuthUser>data.json(); })
            .catch(handleError);
    }

    public logout() {
        this._user.changeUser(<IAuthUser>{});
    }

    getUserList(): Observable<any> {
        return this._http.get(UserListApi)
            .map(res => <IAuthUser[]>res.json())
            .do(data => {
                console.debug('UserList' +
                    '\nUrl: ' + UserListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }

    public getUserId(userId: number): Observable<any> {
        let urlUserIdApi = UserIdApi.replace('%userID%', '' + userId);
        return this._http.get(urlUserIdApi)
            .map(res => <IAuthUser>res.json())
            .do(data => {
                console.debug('UserId' +
                    '\nUrl: ' + urlUserIdApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }

    public addUser(_user: IAuthUser): Observable<IAuthUser | string> {
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
            .catch(handleError);
    }

    public updateUser(userId: number, _newUser: IAuthUser): Observable<IAuthUser | string> {
        let url = UserIdApi.replace('%railcarID%', '' + userId);
        let body = JSON.stringify(_newUser);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(url, body, options)
            .map(res => <IAuthUser>res.json())
            .do(data => {
                console.debug('UserUpdate' +
                    '\nUrl: ' + UserListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }

    public deleteUser(userId: number): Observable<IAuthUser | string> {
        let url = UserIdApi.replace('%railcarID%', '' + userId);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(url, options)
            .do(data => {
                console.debug('RailcarDelete' +
                    '\nUrl: ' + UserListApi +
                    '\nData: ' + JSON.stringify(data));
            })
            .catch(handleError);
    }

}
