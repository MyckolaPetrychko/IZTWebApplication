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
var view_model_1 = require('../../railcars/routed-child/railcar-view/view.model');
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.colunmVisibility = 'ColunmVisibility';
        this.colunmVisibilityPrint = 'ColunmVisibilityPrint';
    }
    LocalStorageService.prototype.saveViewToStorage = function (_cols) {
        window.localStorage.setItem(this.colunmVisibility, JSON.stringify(_cols));
    };
    LocalStorageService.prototype.getViewFromStorage = function () {
        var _c = new view_model_1.VisibilityConf();
        if (window.localStorage.getItem(this.colunmVisibility)) {
            _c = (JSON.parse(window.localStorage.getItem(this.colunmVisibility)));
        }
        return _c;
    };
    LocalStorageService.prototype.saveViewPrintToStorage = function (_cols) {
        window.localStorage.setItem(this.colunmVisibilityPrint, JSON.stringify(_cols));
    };
    LocalStorageService.prototype.getViewPrintFromStorage = function () {
        var _c = new view_model_1.VisibilityConf();
        if (window.localStorage.getItem(this.colunmVisibilityPrint)) {
            _c = (JSON.parse(window.localStorage.getItem(this.colunmVisibilityPrint)));
        }
        return _c;
    };
    LocalStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;

//# sourceMappingURL=storage.service.js.map
