/**
 * @author Maryna Duda
 * @email maryna.duda@innovinnprom.com
 * @date   22/06/2016 10:50
 */
"use strict";
// service
var disparity_service_1 = require('./disparity.service');
// factory to create service
exports.DisparityFactory = function (http, auth) {
    return new disparity_service_1.DisparityService(http, auth);
};

//# sourceMappingURL=disparity.factory.js.map
