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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/fromPromise';
var ng2_translate_1 = require('ng2-translate');
var railcars_service_1 = require('../railcars.service');
var combobox_component_1 = require('.././../shared/combobox/combobox.component');
var alert_component_1 = require('../../shared/alert/alert.component');
var my_date_picker_component_1 = require('../../shared/my-date-picker/my-date-picker.component');
var filter_data_service_1 = require('../../filters-data/filter-data.service');
var RailcarItemComponent = (function () {
    function RailcarItemComponent(_router, _route, _railcars, _filters) {
        this._router = _router;
        this._route = _route;
        this._railcars = _railcars;
        this._filters = _filters;
        this.message = 'MESS.LOADING';
        this.isVisibleElement = false;
        this.railcar = {};
        this.isDisableTextContentEditor = true;
        this.isVisibleAddAsFile = false;
    }
    RailcarItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscribeRouter = this._router.params.subscribe(function (params) {
            _this.id = params['id'];
            if (_this.id) {
                _this._railcars.getRailcarId(_this.id).subscribe(function (val) {
                    _this.railcar = val;
                }, function (err) {
                    _this.message = err;
                });
            }
            _this.isVisibleElement = true;
        });
        this._filters.getCulturesList().subscribe(function (val) {
            _this._cultures = val;
            _this._classes = val;
            _this._sorts = val;
        });
        this._filters.getStationsList().subscribe(function (val) {
            console.log(val);
            _this._stations = val;
        });
        this._filters.getSendersList().subscribe(function (val) {
            _this._senders = val;
            _this._owners = val;
            _this._providers = val;
            _this._srorages = val;
        });
        this._filters.getCulturesList().subscribe(function (val) {
            _this._srorages = ['storage 1', 'storage default'];
            _this._scales = ['scale 1', 'scale default'];
        });
    };
    RailcarItemComponent.prototype.ngOnDestroy = function () {
        this._subscribeRouter.unsubscribe();
    };
    RailcarItemComponent.prototype.readNow = function (event) {
        console.log(event.target.files[0]);
        var filename;
        var self = this;
        var file = event.target.files[0];
        var myReader = new FileReader();
        myReader.readAsText(file);
        myReader.onloadend = function (e) {
            self.content = myReader.result;
        };
    };
    RailcarItemComponent.prototype.setDisableTextContentEditor = function () {
        this.isDisableTextContentEditor = !this.isDisableTextContentEditor;
    };
    RailcarItemComponent.prototype.setVisibleAddAsFile = function () {
        this.isVisibleAddAsFile = !this.isVisibleAddAsFile;
    };
    RailcarItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-railcar-item',
            templateUrl: 'railcars-element.component.html',
            styleUrls: ['railcars-element.component.css'],
            pipes: [ng2_translate_1.TranslatePipe, common_1.JsonPipe],
            directives: [combobox_component_1.ComboboxComponent, alert_component_1.AlertComponent, forms_1.FORM_DIRECTIVES, common_1.NgIf, common_1.NgClass, my_date_picker_component_1.MyDatePicker]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, railcars_service_1.RailcarService, filter_data_service_1.DataFilterService])
    ], RailcarItemComponent);
    return RailcarItemComponent;
}());
exports.RailcarItemComponent = RailcarItemComponent;

//# sourceMappingURL=railcars-element.component.js.map
