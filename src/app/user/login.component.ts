import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'login.component.html',
    styles : ['login.component.css']
})
export class UserLoginComponent implements OnInit {
    constructor(private _auth: AuthService) { }

    ngOnInit() { 

    }

    public login(_role:string) {
        console.log(_role);
        
        this._auth.login(_role, '');
    }

    public logout() {
        this._auth.logout();
    }
}
