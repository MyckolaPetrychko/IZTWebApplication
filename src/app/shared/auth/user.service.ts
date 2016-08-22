import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { IAuthUser } from './auth-user.model';

import { USER_LOCAL_STRORAGE_CONSTANT } from './auth.constant';
import { USER_ROLES, IUserRoles } from './user-roles.model';

@Injectable()
export class UserService {

    public userChangeAnnonced: Observable<IAuthUser>;
    private currentUser: IAuthUser;
    private userSource: Subject<IAuthUser>;

    private _role : string;
    private _isLogined : boolean;
    private _roles: IUserRoles;

    constructor() {
        this._isLogined = false;
        this._role = null;
         this._roles = USER_ROLES;

        this.currentUser = <IAuthUser>{};
        this.userSource = new Subject<IAuthUser>();
        this.userChangeAnnonced = this.userSource.asObservable();

        if (this.isUserInLocalStorage()) {
            this.changeUser (this.getUserFromStorage());
        }
    }

    public changeUser(_user: IAuthUser) {
        if (
            !! _user
            && !! ('' +_user.id)
            && _user.id !== null
            && _user.id !== undefined) {
            console.info('User is auth' + _user.username);
            this.currentUser = _user;
            this._isLogined = true;
            this._role = this.currentUser.roles[0];
            this.saveUser();
        } else {
            console.warn('User is not auth' + _user.username);
            this._isLogined = false;
            this._role = null;
            this.currentUser = null;
            this.deleteUserFromStorage();
        }
        this.userSource.next(this.currentUser);
    }



    public isLogined(): boolean {
        console.log('Is logined' + this._isLogined);
        return (
            this._isLogined
        );
    }

    public isAuth(_role: string) {
        return (
            this._isLogined
            && this._role
            && (this._roles[_role].indexOf(this._role) !== -1)
        );
    }

    public getCurrentUser(): IAuthUser {
        return this.currentUser;
    }

    private saveUser() {
        window.sessionStorage.setItem(USER_LOCAL_STRORAGE_CONSTANT, JSON.stringify(this.currentUser));
    }

    private getUserFromStorage(): IAuthUser {
        return <IAuthUser>JSON.parse(window.sessionStorage.getItem(USER_LOCAL_STRORAGE_CONSTANT));
    }

    private isUserInLocalStorage(): boolean {
        return !!window.sessionStorage.getItem(USER_LOCAL_STRORAGE_CONSTANT);
    }

    private deleteUserFromStorage(): void {
        window.sessionStorage.removeItem(USER_LOCAL_STRORAGE_CONSTANT);
    }
}
