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


import {UserLoginApi, UserLogoutApi } from './auth.constant';
import { IAuthUser } from './auth-user.model';
import { USER_ROLES, IUserRoles } from './user-roles.model';

@Injectable()
export class AuthService {

    public _isLogined : boolean; 
    // public user : IAuthUser;
    public role: string;
    private _roles: IUserRoles;

    constructor(private _http: Http) { 
        // ROD: remove debug
        this.role = 'admin';
        this._roles = USER_ROLES;
        this._isLogined = true;
    }

    public login(user : string, pass: string): any {
        // let _url = UserLoginApi.replace('%login%', user).replace('%password%', pass);
        this.role = user;
        this._isLogined = true;
        
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
        this.role = 'anonym';
        this._isLogined = false;
    }

    public isLogined() {
        
        // console.log('isLogined');
        
        return this._isLogined
        //return Observable.of(this._isLogined); 
    }

}

