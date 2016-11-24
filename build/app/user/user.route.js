"use strict";
var router_1 = require('@angular/router');
var auth_user_guard_1 = require('../shared/auth/auth-user.guard');
var login_component_1 = require('../user/login.component');
var profile_component_1 = require('../user/profile.component');
var userRoutes = [
    { path: 'login', component: login_component_1.UserLoginComponent },
    { path: 'profile', component: profile_component_1.UserProfileComponent, canActivate: [auth_user_guard_1.AuthGuard] }
];
exports.routing = router_1.RouterModule.forChild(userRoutes);

//# sourceMappingURL=user.route.js.map
