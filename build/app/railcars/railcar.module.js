"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var shared_module_1 = require('../shared/shared.module');
var railcar_number_validator_1 = require('./common/directives/railcar-number.validator');
var select_railcar_service_1 = require('./common/services/select-railcar.service');
var refresh_service_1 = require('./common/services/refresh.service');
var railcars_service_1 = require('./common/services/railcars-http/railcars.service');
var filter_data_service_1 = require('./common/services/filters-data/filter-data.service');
var railcar_main_component_1 = require('./railcar-main-page/railcar-main.component');
var report_component_1 = require('./railcar-report-page/report.component');
var disparity_component_1 = require('./disparity/disparity.component');
var disparity_service_1 = require('./disparity/disparity.service');
var railcar_disparity_component_1 = require('./railcars-subcomponents/railcar-disparity/railcar-disparity.component');
var railcar_edit_component_1 = require('./railcars-subcomponents/railcar-edit/railcar-edit.component');
var railcar_file_upload_component_1 = require('./railcars-subcomponents/railcar-file-upload/railcar-file-upload.component');
var railcar_list_component_1 = require('./railcars-subcomponents/railcar-list/railcar-list.component');
var view_component_1 = require('./railcars-subcomponents/railcar-view/view.component');
var railcar_route_1 = require('./railcar.route');
var RailcarsModule = (function () {
    function RailcarsModule() {
    }
    RailcarsModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, railcar_route_1.routing],
            providers: [
                filter_data_service_1.DataFilterService,
                railcars_service_1.RailcarService,
                refresh_service_1.RefreshService,
                select_railcar_service_1.SelectRailcarService,
                disparity_service_1.DisparityService,
            ],
            exports: [
                railcar_main_component_1.RailcarsMainComponent,
                report_component_1.RailcarsReportComponent
            ],
            declarations: [
                railcar_disparity_component_1.RailcarDisparityComponent,
                railcar_edit_component_1.RailcarEditComponent,
                railcar_file_upload_component_1.RailcarFileUploadComponent,
                railcar_list_component_1.RailcarListComponent,
                view_component_1.VisibilityConfigComponent,
                railcar_main_component_1.RailcarsMainComponent,
                report_component_1.RailcarsReportComponent,
                disparity_component_1.DisparityListComponent,
                railcar_number_validator_1.RailcarNumberValidator
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], RailcarsModule);
    return RailcarsModule;
}());
exports.RailcarsModule = RailcarsModule;

//# sourceMappingURL=railcar.module.js.map
