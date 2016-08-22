import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../auth/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-nav',
    templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit, OnDestroy {

    private _userChangeSub: Subscription;
    private _isLogined: boolean;

    constructor(private _user: UserService, 
                private _auth: AuthService) {  }

    ngOnInit() {
        this._isLogined = this._user.isLogined();
        this._userChangeSub = this._user.userChangeAnnonced
            .subscribe(() => {
                this._isLogined = this._user.isLogined();
            });
    }
    ngOnDestroy() {
        this._userChangeSub.unsubscribe();
    }

    public logout():void {
        this._auth.logout();
    }

}
