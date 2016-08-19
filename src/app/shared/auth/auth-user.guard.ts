import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService }         from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: UserService, private router: Router) {

    }

    canActivate() {

        if (this.authService.isAuth('user')) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}

