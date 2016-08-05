import { provideRouter, RouterConfig } from '@angular/router';

import { SettingsComponent }    from '../settings/settings.component';
import { railcarsRoutes }    from '../railcars/railcar.route';
import { UserLoginComponent }    from '../user/login.component';
import { UserProfileComponent }    from '../user/profile.component';


import { AuthGuard } from '../user/auth.guard';
import { AuthAdminGuard } from '../user/auth.guard';


const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  ...railcarsRoutes,
  //{ path: 'report', component: ReportRailcarComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthAdminGuard] },
 // { path: 'railcars', component: RailcarsMainComponent, canActivate: [AuthGuard] },
 // { path: 'railcars/:id', component: RailcarsMainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

export const appRouterProviders = [
  provideRouter(routes)
];
