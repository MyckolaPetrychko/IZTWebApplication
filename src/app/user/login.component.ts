import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/auth/user.service';
import { IAuthUser } from '../shared/auth/auth-user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'login.component.html'
    // styles : ['login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
    private user: { username: string, password: string };

    private message: string;
    private type: string;
    private time: number;
    private visibility: boolean;

    private mainModal: boolean;
    private isErrRouterMess: boolean;
    private errRouterMess: boolean;

    private _roterSub: Subscription;

    constructor(
        private _user: UserService,
        private _auth: AuthService,
        private _route: Router,
        private _router: ActivatedRoute) {

        this.isErrRouterMess = false;
        this.visibility = false;
        this.mainModal = true;
        // this.setMessage('MESSAGE.LOADING', 0, 'info');
        this.user = {
            username: null,
            password: null
        }
    }

    ngOnInit() {
                this.mainModal = true;

        this._roterSub = this._router.params.subscribe(
            (params: Params): void => {
                this.errRouterMess = params['message'];
                this.isErrRouterMess = (!!this.errRouterMess);
            });
    }

    ngOnDestroy() {
        this._roterSub.unsubscribe();
    }


        @HostListener('click') onClick() {
            // NOTE: fix close event by outside modal click;
                this.mainModal = true;

    }

    public login() {
        this._auth.login(this.user.username, this.user.password)
            .subscribe(
            (data: IAuthUser) => {
                this._user.changeUser(data);
                if (this.isErrRouterMess) {
                    this.cancel();
                } else {
                    this._route.navigate(['/railcars']);
                }

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

    private cancel(): void {
        window.history.back();
    }


}
