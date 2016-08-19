import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService }         from './user.service';


@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(
        private authService: UserService,
         private router: Router) {  }
    canActivate() {
        if (this.authService.isAuth('admin')) { return true; }
        // this.router.navigate(['/login', {message: 'CONNECTION.USER_MUSS_BE_ADMIN'}]);
        this.router.navigate(['/login', {message: 'CONNECTION.USER_NOT_AUTH'}]);
        return false;
    }
}
