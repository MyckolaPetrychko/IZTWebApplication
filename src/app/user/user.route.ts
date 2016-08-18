import { Routes,
         RouterModule } from '@angular/router';


import { AuthGuard } from '../shared/auth/auth-user.guard';

import { UserLoginComponent } from '../user/login.component';
import { UserProfileComponent } from '../user/profile.component';


const userRoutes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];
export const routing = RouterModule.forChild(userRoutes);
