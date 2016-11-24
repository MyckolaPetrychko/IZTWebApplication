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
var storage_service_1 = require('../../../shared/services/storage.service');
var view_model_1 = require('./view.model');
// import { AlertComponent } from '../../../shared/alert/alert.component';
var VisibilityConfigComponent = (function () {
    function VisibilityConfigComponent(_storage) {
        this._storage = _storage;
        this.cols = new view_model_1.VisibilityConf();
        this.propertiesBase = [];
        this.propertiesColsPart1 = [];
        this.propertiesColsPart2 = [];
        this.isPrintType = false;
    }
    VisibilityConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isPrintType) {
            this.cols = this._storage.getViewPrintFromStorage();
        }
        else {
            this.cols = this._storage.getViewFromStorage();
        }
        this.propertiesBase = Object.keys(this.cols);
        this.propertiesBase.pop();
        var prop = Object.keys(this.cols.cols);
        var half = Math.floor(prop.length / 2);
        prop.forEach(function (item, i) {
            if (i <= half) {
                _this.propertiesColsPart1.push(item);
            }
            else {
                _this.propertiesColsPart2.push(item);
            }
        });
    };
    VisibilityConfigComponent.prototype.changeProperty = function (_prop) {
        this.cols[_prop] = !this.cols[_prop];
        this.onSave();
    };
    VisibilityConfigComponent.prototype.onSave = function () {
        if (this.isPrintType) {
            this._storage.saveViewPrintToStorage(this.cols);
        }
        else {
            this._storage.saveViewToStorage(this.cols);
        }
    };
    VisibilityConfigComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-visibility-conf',
            templateUrl: './view.component.html',
        }), 
        __metadata('design:paramtypes', [storage_service_1.LocalStorageService])
    ], VisibilityConfigComponent);
    return VisibilityConfigComponent;
}());
exports.VisibilityConfigComponent = VisibilityConfigComponent;

//# sourceMappingURL=view.component.js.map
