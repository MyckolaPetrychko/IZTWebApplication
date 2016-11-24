"use strict";
var router_1 = require('@angular/router');
var auth_user_guard_1 = require('../shared/auth/auth-user.guard');
// import { CrisisDetailComponent } from './crisis-detail.component';
// import { CrisisListComponent }   from './crisis-list.component';
// import { CrisisCenterComponent } from './crisis-center.component';
var railcar_main_component_1 = require('./railcar-main-page/railcar-main.component');
var report_component_1 = require('./railcar-report-page/report.component');
var railcar_list_component_1 = require('./railcars-subcomponents/railcar-list/railcar-list.component');
var railcar_edit_component_1 = require('./railcars-subcomponents/railcar-edit/railcar-edit.component');
var railcar_file_upload_component_1 = require('./railcars-subcomponents/railcar-file-upload/railcar-file-upload.component');
var view_component_1 = require('./railcars-subcomponents/railcar-view/view.component');
exports.railcarsRoutes = [
    { path: 'report', component: report_component_1.RailcarsReportComponent, canActivate: [auth_user_guard_1.AuthGuard] },
    {
        path: 'railcars', component: railcar_main_component_1.RailcarsMainComponent, canActivate: [auth_user_guard_1.AuthGuard],
        children: [
            { path: 'view', component: view_component_1.VisibilityConfigComponent },
            { path: 'file', component: railcar_file_upload_component_1.RailcarFileUploadComponent },
            { path: ':id', component: railcar_edit_component_1.RailcarEditComponent },
            { path: '', component: railcar_list_component_1.RailcarListComponent },
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(exports.railcarsRoutes);

//# sourceMappingURL=railcar.route.js.map
