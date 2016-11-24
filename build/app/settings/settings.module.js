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
var platform_browser_1 = require('@angular/platform-browser');
var settings_component_1 = require('./settings.component');
var shared_module_1 = require('../shared/shared.module');
var user_list_service_1 = require('./userlist/user-list.service');
var filter_data_service_1 = require('../railcars/common/services/filters-data/filter-data.service');
var SettingsModule = (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, shared_module_1.SharedModule],
            declarations: [settings_component_1.SettingsComponent],
            exports: [settings_component_1.SettingsComponent],
            providers: [filter_data_service_1.DataFilterService, user_list_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [])
    ], SettingsModule);
    return SettingsModule;
}());
exports.SettingsModule = SettingsModule;

//# sourceMappingURL=settings.module.js.map
