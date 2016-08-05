import { RouterConfig }          from '@angular/router';
import { AuthGuard } from '../user/auth.guard';


// import { CrisisDetailComponent } from './crisis-detail.component';
// import { CrisisListComponent }   from './crisis-list.component';
// import { CrisisCenterComponent } from './crisis-center.component';

import { RailcarsMainComponent } from './railcar-main-page/railcar-main.component';
import { RailcarsReportComponent } from './railcar-report-page/report.component';

import { RailcarListComponent } from './routed-child/railcar-list/railcar-list.component';
import { RailcarEditComponent } from './routed-child/railcar-edit/railcar-edit.component';
import { RailcarFileUploadComponent } from './routed-child/railcar-file-upload/railcar-file-upload.component';
import { VisibilityConfigComponent } from './routed-child/railcar-view/view.component';


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
