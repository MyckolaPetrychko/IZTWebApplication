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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var main_1 = require('ag-grid-ng2/main');
var auth_admin_guard_1 = require('./auth/auth-admin.guard');
var auth_user_guard_1 = require('./auth/auth-user.guard');
var auth_service_1 = require('./auth/auth.service');
var user_service_1 = require('./auth/user.service');
var value_filter_pipe_1 = require('./pipes/value-filter.pipe');
var data_filter_pipe_1 = require('./pipes/data-filter.pipe');
var storage_service_1 = require('./services/storage.service');
var footer_component_1 = require('./components/footer/footer.component');
var nav_component_1 = require('./components/nav/nav.component');
var alert_component_1 = require('./components/alert/alert.component');
var modal_component_1 = require('./components/modal/modal.component');
var input_component_1 = require('./components/input/input.component');
var combobox_component_1 = require('./components/combobox/combobox.component');
var data_combobox_component_1 = require('./components/data-combobox/data-combobox.component');
var my_date_picker_component_1 = require('./components/my-date-picker/my-date-picker.component');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [
                storage_service_1.LocalStorageService,
                auth_service_1.AuthService,
                user_service_1.UserService,
                auth_admin_guard_1.AuthAdminGuard,
                auth_user_guard_1.AuthGuard,
                my_date_picker_component_1.DATEPICKER_CONTROL_VALUE_ACCESSOR,
                data_combobox_component_1.DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR,
                combobox_component_1.COMBOBOX_CONTROL_VALUE_ACCESSOR,
                input_component_1.WBLG_INPUT_CONTROL_VALUE_ACCESSOR
            ]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, '/assets/i18n', '.json'); },
                    deps: [http_1.Http]
                })
            ],
            declarations: [
                main_1.AgGridNg2,
                value_filter_pipe_1.ValueFilterPipe,
                data_filter_pipe_1.DataFilterPipe,
                footer_component_1.FooterComponent,
                nav_component_1.NavComponent,
                alert_component_1.AlertComponent,
                modal_component_1.ModalComponent,
                input_component_1.InputComponent,
                combobox_component_1.ComboboxComponent,
                data_combobox_component_1.DataComboboxComponent,
                my_date_picker_component_1.MyDatePicker
            ],
            exports: [
                main_1.AgGridNg2,
                value_filter_pipe_1.ValueFilterPipe,
                data_filter_pipe_1.DataFilterPipe,
                footer_component_1.FooterComponent,
                nav_component_1.NavComponent,
                alert_component_1.AlertComponent,
                modal_component_1.ModalComponent,
                input_component_1.InputComponent,
                combobox_component_1.ComboboxComponent,
                data_combobox_component_1.DataComboboxComponent,
                my_date_picker_component_1.MyDatePicker,
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_translate_1.TranslateModule
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;

//# sourceMappingURL=shared.module.js.map
