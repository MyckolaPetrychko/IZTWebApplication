/**
 * @author Maryna Duda
 * @email maryna.duda@innovinnpromm.com
 * @date 23.06.2016 11:38:31
 */
"use strict";
// TODO: RailcarProvide | add parametr to service
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var railcars_service_1 = require('./railcars.service');
var railcars_factory_1 = require('./railcars.factory');
var auth_service_1 = require('../user/auth.service');
/**
  *  Provider to service by railcar,
  *  factory: RailcarFactory - factory by create service
  *  depensiens: Http - angular2 http module
  *
  * @export RailcarProvide
  * @param {Provider} RailcarProvide  - provide for RailcarService
  */
exports.RailcarProvide = core_1.provide(railcars_service_1.RailcarService, {
    useFactory: railcars_factory_1.RailcarFactory,
    deps: [http_1.Http, auth_service_1.AuthService]
});

//# sourceMappingURL=railcars.provide.js.map
