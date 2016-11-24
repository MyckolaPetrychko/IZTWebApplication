/**
 * @author Maryna Usatiuk
 * @email maryna.duda@innovinnprom.com
 * @date 05.08.2016 09:50:59
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
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var common_1 = require('@angular/common');
var railcars_service_1 = require('../../common/services/railcars-http/railcars.service');
// import { AlertComponent } from '../../../shared/alert/alert.component';
/**
 * Component for disparitys for selected railcar
 *
 * @export
 * @class RailcarDisparityComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {OnChanges}
 */
var RailcarDisparityComponent = (function () {
    /**
     * Creates an instance of RailcarDisparityComponent.
     *
     * @param {RailcarService} _disparity - servise to get for https disparitys
     * @param {TranslateService} _translate - translate servise
     */
    function RailcarDisparityComponent(_disparity, _translate) {
        this._disparity = _disparity;
        this._translate = _translate;
        this._datePipe = new common_1.DatePipe();
        this.isNotNull = false;
        this.message = 'TABLE.LOADING';
        this.DisparityList = [];
    }
    /**
     * Initial data
     *
     */
    RailcarDisparityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createColunmDef();
        this.createGridOptions();
        this._subTranslate = this._translate.onLangChange
            .debounceTime(1000)
            .subscribe(function (event) {
            if (_this.gridOptions && _this.gridOptions.api) {
                _this.gridOptions.api.refreshHeader();
            }
        });
    };
    /**
     * Destroy data
     *
     */
    RailcarDisparityComponent.prototype.ngOnDestroy = function () {
        this._subTranslate.unsubscribe();
    };
    /**
     * Check schanges of railcarId
     *
     * @param {{
     *         [propName: string]: SimpleChange
     *     }} changes
     */
    RailcarDisparityComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            this.railcarNumber = changes[propName].currentValue;
            if (this.gridOptions && this.gridOptions.api) {
                this.gridOptions.api.sizeColumnsToFit();
            }
            this.refreshData();
        }
    };
    /**
     * Set railcarNumber as railcarId
     *
     * @param {number} _val
     */
    RailcarDisparityComponent.prototype.set = function (_val) {
        this.railcarNumber = _val;
    };
    /**
     * Check if exist railcarNumber and get data
     */
    RailcarDisparityComponent.prototype.refreshData = function () {
        var _this = this;
        this.isNotNull = false;
        this.message = 'MESSAGE.LOADING';
        this.type = 'info';
        if (this.railcarNumber !== null && this.railcarNumber !== undefined) {
            this._disparity.getRailcarDisparityList('' + this.railcarNumber)
                .subscribe(function (res) {
                _this.DisparityList = res;
                if (_this.DisparityList.length > 0) {
                    _this.isNotNull = true;
                }
                else {
                    _this.isNotNull = false;
                    _this.message = 'MESSAGE.EMPTY_TABLE';
                    _this.type = 'info';
                }
            }, function (err) {
                _this.DisparityList = [];
                _this.isNotNull = false;
                _this.type = 'error';
                _this.message = err;
            });
        }
        else {
            this.isNotNull = false;
            this.type = 'info';
            this.message = 'ERROR.NOT_SELECTED';
        }
    };
    /**
     * Translate params.headerName  from Ag-Grid
     *
     * @private
     * @param {*} params
     * @returns {string}
     */
    RailcarDisparityComponent.prototype.translateHeaderName = function (params) {
        var translate = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe(function (val) {
            translate = val;
        });
        return translate;
    };
    /**
     * Create column definitions
     *
     * @private
     */
    RailcarDisparityComponent.prototype.createColunmDef = function () {
        var _this = this;
        this.columnDefs = [
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 300,
                layoutInterval: 500
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                width: 200,
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                layoutInterval: 500
            },
            {
                headerName: 'TABLE.permission',
                layoutInterval: 500,
                children: [
                    {
                        headerName: 'TABLE.permissiontime',
                        field: 'permissiontime',
                        cellClass: 'table-cell-center',
                        width: 150,
                        cellRenderer: function (params) {
                            return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                    },
                    {
                        headerName: 'TABLE.permissionusername',
                        field: 'permissionusername',
                        cellClass: 'table-cell-left',
                        width: 200
                    }]
            },
            {
                headerName: 'TABLE.confirmation',
                layoutInterval: 500,
                children: [
                    {
                        headerName: 'TABLE.confirmationtime',
                        field: 'confirmationtime',
                        cellClass: 'table-cell-center',
                        width: 150,
                        cellRenderer: function (params) {
                            return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                    },
                    {
                        headerName: 'TABLE.confirmationusername',
                        field: 'confirmationusername',
                        cellClass: 'table-cell-left',
                        width: 200
                    }]
            }
        ];
    };
    /**
     * Creade gridoptions for ag-grid
     *
     * @private
     */
    RailcarDisparityComponent.prototype.createGridOptions = function () {
        var _this = this;
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.DisparityList,
            rowSelection: 'single',
            enableColResize: true,
            headerCellRenderer: function (params) {
                var txtGroup = document.getElementsByClassName('ag-header-group-text');
                var _loop_1 = function(i) {
                    var element_1 = txtGroup.item(i);
                    var text = element_1.textContent;
                    var txt = text;
                    _this._translate.get(text).subscribe(function (val) {
                        element_1.innerHTML = '';
                        element_1.appendChild(document.createTextNode(val));
                    });
                };
                for (var i = 0; i < txtGroup.length; i++) {
                    _loop_1(i);
                }
                return _this.translateHeaderName(params);
            },
            headerHeight: 30,
            rowHeight: 20,
            onGridReady: function () {
                _this.gridOptions.api.sizeColumnsToFit();
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true
        };
    };
    __decorate([
        core_1.Input('railcarId'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number]), 
        __metadata('design:returntype', void 0)
    ], RailcarDisparityComponent.prototype, "set", null);
    RailcarDisparityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-railcar-disparity',
            templateUrl: './railcar-disparity.component.html',
        }), 
        __metadata('design:paramtypes', [railcars_service_1.RailcarService, ng2_translate_1.TranslateService])
    ], RailcarDisparityComponent);
    return RailcarDisparityComponent;
}());
exports.RailcarDisparityComponent = RailcarDisparityComponent;

//# sourceMappingURL=railcar-disparity.component.js.map
