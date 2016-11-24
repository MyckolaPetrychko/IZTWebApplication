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
var ng2_translate_1 = require('ng2-translate');
var TableComponent = (function () {
    function TableComponent() {
        this.isLoading = true;
        // this.headers = [];
        // this.colunms = [];
        // this.data = [];
        this.tableData = [];
    }
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.viewedColunms = this.colunms.filter(function (item) {
            return !item.hidden;
        });
        this.isLoading = true;
        if (this.dataList.lenght > 0) {
            this.dataList.forEach(function (item) {
                _this.tableData.push({ data: item, isActive: false });
            });
        }
    };
    TableComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            console.log(propName + ": currentValue = " + cur + ", previousValue = " + prev);
        }
        // console.log('ngOnChanges - propertyName = ' + JSON.stringify(changes['colunms']));
        this.viewedColunms = this.colunms.filter(function (item) {
            return true;
        });
        if (this.dataList.lenght > 0) {
            this.dataList.forEach(function (item) {
                _this.tableData.push({ data: item, isActive: false });
            });
        }
    };
    TableComponent.prototype.onResize = function () {
        this.heightTable = document.getElementById('table_railcars').offsetHeight - 70;
        console.warn(document.getElementById('table_railcars').offsetHeight);
    };
    TableComponent.prototype.setRowClass = function (item) {
        return '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "headers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "colunms", void 0);
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "dataList", void 0);
    TableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-table',
            templateUrl: 'table.component.html',
            styleUrls: ['table.component.css'],
            pipes: [ng2_translate_1.TranslatePipe]
        }), 
        __metadata('design:paramtypes', [])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;

//# sourceMappingURL=table.component.js.map
