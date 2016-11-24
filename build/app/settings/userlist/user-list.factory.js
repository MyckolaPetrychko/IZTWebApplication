"use strict";
var user_list_service_1 = require('./user-list.service');
exports.UserFactory = function (http) {
    return new user_list_service_1.UserService(http);
};

//# sourceMappingURL=user-list.factory.js.map
