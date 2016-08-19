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


import { UserLoginApi, UserLogoutApi } from './auth.constant';
import { UserService } from './user.service';
import { IAuthUser } from './auth-user.model';
import { USER_ROLES, IUserRoles } from './user-roles.model';

import { handleError } from '../variable/error-handler.function';
import { Base64 } from '../variable/base64.class';

@Injectable()
export class AuthService {

    // public _isLogined: boolean;
    // public user: IAuthUser;
    // public role: string;
    // private _roles: IUserRoles;

    constructor(
        private _http: Http,
        private _user: UserService) {
        // ROD: remove debug
        // this.role = 'ROLE_ANONYM';
        // this._roles = USER_ROLES;
        // this._isLogined = true;
    }

    public login(user: string, pass: string): Observable<IAuthUser | string> {
        // TODO: FIX md5, ssh???
        var str: string = 'Basic ' + Base64.encode(user + ':' + pass);
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', str);

        console.log(options);
        return this._http.get(UserLoginApi, options)
            .map((data: Response): IAuthUser => { return <IAuthUser>data.json(); })
            .catch(handleError);
    }

    // public isAuth(_role: string) {
    //     return (
    //         this._isLogined
    //         && (this._roles[_role].indexOf(this.role) !== -1)
    //     );
    // }

    public logout() {
        this._user.changeUser(null);
        // this.role = 'ROLE_ANONYM';
        // this._isLogined = false;
    }

    // public isLogined() {
    //     return this._isLogined
    // }
}
