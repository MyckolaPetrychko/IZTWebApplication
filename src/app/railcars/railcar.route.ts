import { Routes,
         RouterModule } from '@angular/router';

import { RouterConfig }          from '@angular/router';

import { AuthGuard } from '../shared/auth/auth-user.guard';


// import { CrisisDetailComponent } from './crisis-detail.component';
// import { CrisisListComponent }   from './crisis-list.component';
// import { CrisisCenterComponent } from './crisis-center.component';

import { RailcarsMainComponent } from './railcar-main-page/railcar-main.component';
import { RailcarsReportComponent } from './railcar-report-page/report.component';

import { RailcarListComponent } from './railcars-subcomponents/railcar-list/railcar-list.component';
import { RailcarEditComponent } from './railcars-subcomponents/railcar-edit/railcar-edit.component';
import { RailcarFileUploadComponent } from './railcars-subcomponents/railcar-file-upload/railcar-file-upload.component';
import { VisibilityConfigComponent } from './railcars-subcomponents/railcar-view/view.component';


export const railcarsRoutes: RouterConfig = [
    { path: 'report', component: RailcarsReportComponent, canActivate: [AuthGuard] },
    {
        path: 'railcars', component: RailcarsMainComponent, canActivate: [AuthGuard],
        children: [
              { path: 'view', component: VisibilityConfigComponent },
              { path: 'file', component: RailcarFileUploadComponent },
              { path: ':id',  component: RailcarEditComponent },
              { path: '',     component: RailcarListComponent },
        ]

    }
];
export const routing = RouterModule.forChild(railcarsRoutes);
