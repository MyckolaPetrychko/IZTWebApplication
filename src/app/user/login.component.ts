import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'login.component.html'
    // styles : ['login.component.css']
})
export class UserLoginComponent implements OnInit {
    private user: { username: string, password: string};

    constructor(private _auth: AuthService) { }

    ngOnInit() { 
        this.user = {
            username: null,
            password: null
        }

    }

    public login() {
       this._auth.login(this.user.username, this.user.username);
    }

    // public logout() {
    //     this._auth.logout();
    // }
}
