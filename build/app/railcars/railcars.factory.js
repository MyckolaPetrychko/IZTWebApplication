/**
 * @author Maryna Duda
 * @email maryna.duda@innovinnpromm.com
 * @date 23.06.2016 11:38:31
 */
"use strict";
// TODO: RailcarFactory | add parametr to service
var railcars_service_1 = require('./railcars.service');
/**
  * Factory to create service by railcar
  *
  * @export RailcarFactory
  * @param {Http} http      - angular2 http module
  * @returns RailcarService - service by work with railcars
  */
exports.RailcarFactory = function (http, auth) {
    return new railcars_service_1.RailcarService(http, auth);
};

//# sourceMappingURL=railcars.factory.js.map
