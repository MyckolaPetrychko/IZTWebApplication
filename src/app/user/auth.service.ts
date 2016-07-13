import { Injectable } from '@angular/core';
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

@Injectable()
export class AuthService {

    public _isLogined : boolean; 
    private _role: string;

    constructor(private _http: Http) { 
        this._role='anonym';
        this._isLogined = false;
    }

    public login(user : string, pass: string): any {
        // let _url = UserLoginApi.replace('%login%', user).replace('%password%', pass);
        this._role = user;
        this._isLogined = true;
        console.log(this._role + ' ' + this._isLogined );
        
    }

    public isAuth( roles : string [] ) {
        let res : boolean;//Observable<boolean>;

        if ( !this._isLogined ) {
            // res = Observable.of(false);
            res = false;
        } else {
            res = (roles.indexOf(this._role) === -1)? false : true;
            // res = Observable.of(roles.indexOf(this._role) === -1);
        }
        console.log('auth is' + JSON.stringify(roles) + ',' + this._role + ',' 
        + this._isLogined + '\n res' + JSON.stringify(res));
        return res;
    }

    public logout() {
                this._role = 'anonym';
        this._isLogined = false;
    }

    public isLogined() {
        
        // console.log('isLogined');
        
        return this._isLogined
        //return Observable.of(this._isLogined); 
    }
}

