"use strict";
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var settings_component_1 = require('../settings/settings.component');
var auth_admin_guard_1 = require('../shared/auth/auth-admin.guard');
exports.routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    // ...railcarsRoutes,
    { path: 'railcars', loadChildren: '../railcars/railcar.module' },
    { path: 'login', loadChildren: '../user/user.module' },
    { path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_admin_guard_1.AuthAdminGuard] },
];
exports.routerProviders = [
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });

//# sourceMappingURL=main.routers.js.map
