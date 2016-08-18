import { Routes,
         RouterModule,
       } from '@angular/router';

       import {provide} from '@angular/core' 
import { LocationStrategy,
    HashLocationStrategy } from '@angular/common';
import { SettingsComponent }    from '../settings/settings.component';
// import { railcarsRoutes }    from '../railcars/railcar.route';
import { UserLoginComponent }    from '../user/login.component';
import { UserProfileComponent }    from '../user/profile.component';

import { AuthGuard } from '../shared/auth/auth-user.guard';
import { AuthAdminGuard } from '../shared/auth/auth-admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
    // ...railcarsRoutes,
  { path: 'railcars', loadChildren: '../railcars/railcar.module' },
  { path: 'login', loadChildren: '../user/user.module' },


  { path: 'settings', component: SettingsComponent, canActivate: [AuthAdminGuard] },

];

export let routerProviders : any = [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
]


export const routing = RouterModule.forRoot(routes, {useHash: true});
