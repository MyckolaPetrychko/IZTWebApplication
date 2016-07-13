import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService }         from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    roles: string[];
    constructor(private authService: AuthService, private router: Router) {
        this.roles = [];
        this.roles.push('traider');
        this.roles.push('employeer');
        this.roles.push('user');
        this.roles.push('admin');

    }

    canActivate() {

        if (this.authService.isAuth(this.roles)) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}

// TODO: new file
@Injectable()
export class AuthAdminGuard implements CanActivate {
    roles: string[];
    constructor(private authService: AuthService, private router: Router) {
        this.roles = [];
        this.roles.push('admin');
   }
    canActivate() {
        if (this.authService.isAuth(this.roles)) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}
