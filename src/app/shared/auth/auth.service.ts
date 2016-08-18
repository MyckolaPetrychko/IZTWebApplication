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
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';


import { UserLoginApi, UserLogoutApi } from './auth.constant';
import { IAuthUser } from './auth-user.model';
import { USER_ROLES, IUserRoles } from './user-roles.model';

import { handleError } from '../variable/error-handler.function';
import { Base64 } from '../variable/base64.class';
@Injectable()
export class AuthService {

    public _isLogined : boolean; 
    public user : IAuthUser;
    public role: string;
    private _roles: IUserRoles;

    constructor(private _http: Http) { 
        // ROD: remove debug
        this.role = 'ROLE_ADMIN';
        this._roles = USER_ROLES;
        this._isLogined = true;
    }

    public login(user : string, pass: string): Observable<IAuthUser | string> {
		var str = 'Basic ' + Base64.encode(user + ':' + pass);
        let options: RequestOptions;
        // options.headers.append('Authorization', str);
        return this._http.get(UserLoginApi )
        .map((data : Response) : IAuthUser => { return <IAuthUser>data.json()})
        .do((data : IAuthUser) => {
            this.user = data;
            this.role = data.role;
            this._isLogined = true;
        })
        .catch(handleError);
    }
    public isAuth( _role : string  ) {
        let res : boolean;
        if ( !this._isLogined ) {
            res = false;
        } else {
            res = (this._roles[_role].indexOf(this.role) === -1)? false : true;
        }
        return res;
    }

    public logout() {
        this.user = null;
        this.role = 'anonym';
        this._isLogined = false;
    }

    public isLogined() {
        
        // console.log('isLogined');
        
        return this._isLogined
        //return Observable.of(this._isLogined); 
    }

}

