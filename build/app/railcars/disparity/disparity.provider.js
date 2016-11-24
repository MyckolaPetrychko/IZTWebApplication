/**
 * @author Maryna Duda
 * @email maryna.duda@innovinnprom.com
 * @date  08.07.2016 15:34:36
 */
"use strict";
var disparity_service_1 = require('./disparity.service');
var disparity_factory_1 = require('./disparity.factory');
var auth_service_1 = require('../../user/auth.service');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
exports.DisparityProvide = core_1.provide(disparity_service_1.DisparityService, {
    useFactory: disparity_factory_1.DisparityFactory,
    deps: [http_1.Http, auth_service_1.AuthService]
});

//# sourceMappingURL=disparity.provider.js.map
