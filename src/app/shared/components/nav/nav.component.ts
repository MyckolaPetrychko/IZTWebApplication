import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../auth/user.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-nav',
    templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit, OnDestroy {

    private _userChangeSub: Subscription;
    private _isLogined: boolean;

    constructor(private _auth: UserService) {  }

    ngOnInit() {
        this._userChangeSub = this._auth.userChangeAnnonced
            .subscribe(() => {
                this._isLogined = this._auth.isLogined();
            });
    }
    ngOnDestroy() {
        this._userChangeSub.unsubscribe();
    }

}
