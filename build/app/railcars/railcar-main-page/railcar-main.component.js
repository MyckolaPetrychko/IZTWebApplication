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
var refresh_service_1 = require('../common/services/refresh.service');
var select_railcar_service_1 = require('../common/services/select-railcar.service');
var railcars_service_1 = require('../common/services/railcars-http/railcars.service');
var user_service_1 = require('../../shared/auth/user.service');
var RailcarsMainComponent = (function () {
    function RailcarsMainComponent(_refresh, _select, _railcar, _auth, _router) {
        this._refresh = _refresh;
        this._select = _select;
        this._railcar = _railcar;
        this._auth = _auth;
        this._router = _router;
    }
    RailcarsMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isTrader = this._auth.isAuth('trader');
        this._selectSub = this._select.selectedAnnonced.subscribe(function (val) {
            console.log(val);
            _this.selected = val;
            _this.isSelected = (!!val);
        });
    };
    RailcarsMainComponent.prototype.ngOnDestroy = function () {
        this._selectSub.unsubscribe();
    };
    RailcarsMainComponent.prototype.setRefresh = function () {
        this._refresh.refreshData();
    };
    RailcarsMainComponent.prototype.gotoEditRailcar = function () {
        if (this.isSelected) {
            this._router.navigate(['/railcars', this.selected.inventoryid]);
        }
    };
    RailcarsMainComponent.prototype.gotoAddRailcar = function () {
        var temp = {};
        if (this.isSelected) {
            temp = { 'template': this.selected.inventoryid };
        }
        this._router.navigate(['/railcars', 'add', temp]);
    };
    RailcarsMainComponent.prototype.openModal = function (_val) {
        this.modal = _val;
    };
    RailcarsMainComponent.prototype.ok = function () {
        this._railcar.deleteRailcar('' + this.selected.inventoryid);
        this.openModal(false);
    };
    RailcarsMainComponent.prototype.cancel = function () {
        this.openModal(false);
    };
    RailcarsMainComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-railcars',
            templateUrl: './railcar-main.component.html',
        }), 
        __metadata('design:paramtypes', [refresh_service_1.RefreshService, select_railcar_service_1.SelectRailcarService, railcars_service_1.RailcarService, user_service_1.UserService, router_1.Router])
    ], RailcarsMainComponent);
    return RailcarsMainComponent;
}());
exports.RailcarsMainComponent = RailcarsMainComponent;

//# sourceMappingURL=railcar-main.component.js.map
