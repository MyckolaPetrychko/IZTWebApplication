import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/auth/user.service';
import { IAuthUser } from '../shared/auth/auth-user.model';
import { Router /*, ActivatedRoute */} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'login.component.html'
    // styles : ['login.component.css']
})
export class UserLoginComponent {
    private user: { username: string, password: string };

    private message: string;
    private type: string;
    private time: number;
    private visibility: boolean;


    constructor(
        private _user: UserService,
        private _auth: AuthService,
        private _route: Router) {

        this.visibility = false;
        this.setMessage('MESSAGE.LOADING', 5, 'info');
        this.user = {
            username: null,
            password: null
        }
    }



    public login() {
        this._auth.login(this.user.username, this.user.username)
            .subscribe(
            (data: IAuthUser) => {
                this._user.changeUser(data);
               this.setMessage('MESSAGE.SUCESS_AUTH', 5, 'info');

                this._route.navigate(['/railcars']);

            }, (err: string): void => {
                this._user.changeUser(null);
               this.setMessage(err, 0, 'error');

                console.error(err);
            }
            );
    }

    private setMessage(_mess: string, _time: number, _type: string) {
    this.message = _mess;
    this.type = _type;
   this.time = _time;
   this.visibility = true;
    }

    // public logout() {
    //     this._auth.logout();
    // }
}
