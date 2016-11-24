// TODO:FIX permissiontime or confirmtime??? as label of type disparity (deviations)
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
require('rxjs/add/operator/debounceTime');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var disparity_service_1 = require('./disparity.service');
var refresh_service_1 = require('../common/services/refresh.service');
var user_service_1 = require('../../shared/auth/user.service');
var DisparityListComponent = (function () {
    function DisparityListComponent(_disparity, _refresh, _auth, _translate) {
        this._disparity = _disparity;
        this._refresh = _refresh;
        this._auth = _auth;
        this._translate = _translate;
        this.DisparityList = [];
        this.selected = {};
        this.total = 0;
        this.accepted = 0;
        this._datePipe = new common_1.DatePipe();
        this.isNotNull = false;
        this.isHidden = false;
        this.modal = false;
        this.message = 'TABLE.EMPTY';
        this.type = 'info';
        this.isSelected = false;
        this.isTraider = false;
        this.isEmployyer = false;
    }
    DisparityListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refreshData();
        this.createColunmDef();
        this.createGridOptions();
        this._subTranslate = this._translate.onLangChange
            .debounceTime(1000)
            .subscribe(function (event) {
            if (_this.gridOptions && _this.gridOptions.api) {
                _this.gridOptions.api.refreshHeader();
            }
        });
        this._subRefresh = this._refresh.refreshAnnonced.subscribe(function () {
            _this.refreshData();
        });
        this.isEmployyer = this._auth.isAuth('employee');
        this.isTraider = this._auth.isAuth('trader');
    };
    DisparityListComponent.prototype.ngOnDestroy = function () {
        this._subRefresh.unsubscribe();
        this._subTranslate.unsubscribe();
    };
    DisparityListComponent.prototype.refreshData = function () {
        var _this = this;
        this.isNotNull = false;
        this.message = 'MESSAGE.LOADING';
        this.type = 'info';
        this._disparity
            .getDisparityListCurrent()
            .subscribe(function (res) {
            _this.DisparityList = res;
            _this.total = _this.DisparityList.length;
            _this.accepted = 0;
            if (_this.total > 0) {
                _this.isNotNull = true;
                _this.DisparityList.forEach(function (item) {
                    if (item.permissiontime === null) {
                        _this.accepted++;
                    }
                });
            }
            else {
                _this.isNotNull = false;
                _this.message = 'MESSAGE.EMPTY_TABLE';
                _this.type = 'info';
            }
        }, function (err) {
            _this.DisparityList = [];
            _this.isNotNull = false;
            _this.accepted = null;
            _this.total = null;
            _this.type = 'error';
            _this.message = 'Error:' + JSON.stringify(err);
        });
    };
    DisparityListComponent.prototype.show = function () {
        this.isHidden = !this.isHidden;
    };
    DisparityListComponent.prototype.accept = function () {
        var _this = this;
        var railcarID = 0;
        var disparityID = 0;
        this._disparity
            .setDisparityRailcarAcceptApi('' + railcarID, '' + disparityID).subscribe(function (_val) {
            _this._refresh.refreshData();
        }, function (err) {
            _this.DisparityList = [];
            _this.isNotNull = false;
            _this.accepted = null;
            _this.total = null;
            _this.type = 'error';
            _this.message = err;
        });
    };
    DisparityListComponent.prototype.openModal = function (_val) {
        this.modal = _val;
        console.log(_val);
        if (_val === false) {
            this.selected = {};
            this.gridOptions.api.deselectAll();
            this.isSelected = false;
        }
    };
    DisparityListComponent.prototype.ok = function () {
        console.log('accepnt');
        this.accept();
        this.openModal(false);
    };
    DisparityListComponent.prototype.cancel = function () {
        this.openModal(false);
    };
    /**
     * Translate params.headerName  from Ag-Grid
     *
     * @private
     * @param {*} params
     * @returns {string}
     */
    DisparityListComponent.prototype.translateHeaderName = function (params) {
        var translate = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe(function (val) {
            translate = val;
        });
        return translate;
    };
    DisparityListComponent.prototype.createColunmDef = function () {
        var _this = this;
        this.columnDefs = [
            {
                headerName: 'TABLE.ownername',
                field: 'ownername',
                cellClass: 'table-cell-left',
                width: 200,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.providername',
                field: 'providername',
                cellClass: 'table-cell-left',
                width: 200,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.transportnumber',
                field: 'transportnumber',
                cellClass: 'table-cell-right',
                width: 120,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.sampleroutdate',
                field: 'sampleroutdate',
                width: 120,
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.stationname',
                field: 'stationname',
                width: 200,
                cellClass: 'table-cell-left',
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.cropfullname',
                field: 'cropfullname',
                cellClass: 'table-cell-left',
                width: 180,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 300,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                width: 200,
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                layoutInterval: 600
            }
        ];
    };
    DisparityListComponent.prototype.createGridOptions = function () {
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
            getRowClass: function (params) {
                return (params.node.data.permissiontime === null) ?
                    'table-to-confirm-traider ' : 'table-to-confirm-employeer ';
            },
            headerHeight: 30,
            rowHeight: 20,
            onGridReady: function () {
                _this.gridOptions.api.sizeColumnsToFit();
            },
            onSelectionChanged: function () {
                var _sel = _this.gridOptions.api.getSelectedRows();
                if ((_sel.length > 0) &&
                    (_this.selected) &&
                    (_this.selected.inventoryid === _sel[0].inventoryid)) {
                    // this.selected = <IDisparityModel>{};
                    // this.gridOptions.api.deselectAll();
                    _this.openModal(true);
                }
                else {
                    _this.selected = _sel[0];
                    _this.isSelected = true;
                }
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true
        };
    };
    DisparityListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-disparity-list',
            templateUrl: 'disparity.component.html',
        }), 
        __metadata('design:paramtypes', [disparity_service_1.DisparityService, refresh_service_1.RefreshService, user_service_1.UserService, ng2_translate_1.TranslateService])
    ], DisparityListComponent);
    return DisparityListComponent;
}());
exports.DisparityListComponent = DisparityListComponent;

//# sourceMappingURL=disparity.component.js.map
