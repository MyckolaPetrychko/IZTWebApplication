/*
 * @author Марина Усатюк maryna.duda@innovinnprom.com
 * @date Mon 15.08.2016 13:34:48
 *
 * Copyright (c) 2016 ИННОВИННПРОМ
 */
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
var Subject_1 = require('rxjs/Subject');
var SelectRailcarService = (function () {
    function SelectRailcarService() {
        this.selectedRailcarModel = {};
        this.selectedSource = new Subject_1.Subject();
        this.selectedAnnonced = this.selectedSource.asObservable();
    }
    SelectRailcarService.prototype.selectRailcar = function (_selected) {
        if (!!_selected
            && !!_selected.inventoryid
            && _selected.inventoryid !== null
            && _selected.inventoryid !== undefined) {
            this.selectedRailcarModel = _selected;
        }
        else {
            this.selectedRailcarModel = null;
        }
        this.selectedSource.next(this.selectedRailcarModel);
    };
    SelectRailcarService.prototype.selectedRailcar = function () {
        return this.selectedRailcarModel;
    };
    SelectRailcarService.prototype.isSelectedRailcar = function () {
        // console.log(this.selectedRailcarModel.inventoryid);
        return (!!this.selectedRailcarModel.inventoryid &&
            this.selectedRailcarModel.inventoryid !== null &&
            this.selectedRailcarModel.inventoryid !== undefined);
    };
    SelectRailcarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SelectRailcarService);
    return SelectRailcarService;
}());
exports.SelectRailcarService = SelectRailcarService;

//# sourceMappingURL=select-railcar.service.js.map
