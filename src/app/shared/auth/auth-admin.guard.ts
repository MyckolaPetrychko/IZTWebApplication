import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService }         from './auth.service';


@Injectable()
export class AuthAdminGuard implements CanActivate {
    roles: string[];
    constructor(private authService: AuthService, private router: Router) {
        this.roles = [];
        this.roles.push('admin');
   }
    canActivate() {
        if (this.authService.isAuth('admin')) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}
