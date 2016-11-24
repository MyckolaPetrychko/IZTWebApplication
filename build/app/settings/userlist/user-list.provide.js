"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var user_list_service_1 = require('./user-list.service');
var user_list_factory_1 = require('./user-list.factory');
exports.UserProvide = core_1.provide(user_list_service_1.UserService, {
    useFactory: user_list_factory_1.UserFactory,
    deps: [http_1.Http]
});

//# sourceMappingURL=user-list.provide.js.map
