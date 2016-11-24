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
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var railcars_service_1 = require('../../common/services/railcars-http/railcars.service');
var storage_service_1 = require('../../../shared/services/storage.service');
var refresh_service_1 = require('../../common/services/refresh.service');
var select_railcar_service_1 = require('../../common/services/select-railcar.service');
var filter_data_service_1 = require('../../common/services/filters-data/filter-data.service');
var RailcarListComponent = (function () {
    function RailcarListComponent(_railcar, _filters, _storage, _refresh, _select, _translate) {
        this._railcar = _railcar;
        this._filters = _filters;
        this._storage = _storage;
        this._refresh = _refresh;
        this._select = _select;
        this._translate = _translate;
        this._datePipe = new common_1.DatePipe();
        this.RailcarList = [];
        this.isFullPage = true;
        this.message = 'MESSAGE.LOADING';
        this.typeMess = 'info';
        // TODO: table
        this.InputFilterData = [];
        this.ComboboxFilterData = [];
        this.gridOptions = {};
    }
    Object.defineProperty(RailcarListComponent.prototype, "filter", {
        set: function (_val) {
            if (!_val) {
                this.isFullPage = false;
            }
            else {
                this.isFullPage = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    RailcarListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setSelect({});
        this.changeViews();
        this.createColunmDef();
        this.createGridOptions();
        this.initFilters();
        this.initDatePicker();
        this._subscribeTranslate = this._translate.onLangChange
            .debounceTime(1000)
            .subscribe(function (event) {
            if (_this.gridOptions && _this.gridOptions.api) {
                _this.gridOptions.api.refreshHeader();
            }
        });
        this._notifyRefresh = this._refresh.refreshAnnonced.subscribe(function () {
            console.log('refresh ff');
            _this.setFilters();
        });
    };
    RailcarListComponent.prototype.ngOnDestroy = function () {
        this._subscribeTranslate.unsubscribe();
        this._notifyRefresh.unsubscribe();
    };
    RailcarListComponent.prototype.log = function (data) {
        console.log(data);
    };
    RailcarListComponent.prototype.refreshData = function () {
        var _this = this;
        this.setSelect({});
        this._railcar.getRailcarList(this.dateStart.getTime(), this.dateEnd.getTime(), 1, 0, this.shownotreceived, this.showweighted, this.showremoterecords, this.showdeleted, this.InputFilterData[0].value, this.InputFilterData[1].value, this.ComboboxFilterData[0].value, this.ComboboxFilterData[2].value, this.ComboboxFilterData[1].value)
            .subscribe(function (res) {
            _this.RailcarList = res;
            _this.isNotNull = (_this.RailcarList.length > 0);
            _this.message = (!_this.isNotNull) ? 'MESSAGE.EMPTY_TABLE' : null;
            _this.typeMess = 'info';
        }, function (err) {
            _this.RailcarList = [];
            _this.message = err;
            _this.typeMess = 'error';
        });
    };
    RailcarListComponent.prototype.translateHeaderName = function (params) {
        var translate = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe(function (val) {
            translate = val;
        });
        return translate;
    };
    RailcarListComponent.prototype.setFilters = function () {
        this.refreshData();
        this.isNotNull = false;
        this.message = 'MESSAGE.LOADING';
    };
    RailcarListComponent.prototype.initFilters = function () {
        var _this = this;
        this.InputFilterData = [
            { value: '', label: 'TABLE.transportnumber' },
            { value: '', label: 'TABLE.invoicenumber' }
        ];
        this.ComboboxFilterData = [
            { value: '', label: 'TABLE.sendernname', data: [] },
            { value: '', label: 'TABLE.cropfullname', data: [] },
            { value: '', label: 'TABLE.stationname', data: [] },
        ];
        this._filters.getStationsList().subscribe(function (list) {
            _this.ComboboxFilterData[2].data = list;
        });
        this._filters.getCulturesList().subscribe(function (list) {
            _this.ComboboxFilterData[1].data = list;
        });
        this._filters.getSendersList().subscribe(function (list) {
            _this.ComboboxFilterData[0].data = list;
        });
    };
    RailcarListComponent.prototype.initDatePicker = function () {
        var _today = new Date();
        this.dateEnd = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 23, 59, 59, 999),
            this.dateStart = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 0, 0, 0, 0);
    };
    RailcarListComponent.prototype.changeViews = function () {
        var _strg = this._storage.getViewFromStorage();
        if (_strg) {
            this.showdeleted = (_strg.showdeleted) ? 1 : 0;
            this.shownotreceived = (_strg.shownotreceived) ? 1 : 0; // не прийняті
            this.showremoterecords = (_strg.showremoterecords) ? 1 : 0; // 
            this.showweighted = (_strg.showweighted) ? 1 : 0; // зважені по нетто
            this.visibleCols = _strg.cols;
        }
        this.createColunmDef();
    };
    RailcarListComponent.prototype.createColunmDef = function () {
        var _this = this;
        // TODO: add movable and save in local position
        this.columnDefs = [
            {
                headerName: 'TABLE.ownername',
                field: 'ownername',
                cellClass: 'table-cell-left',
                width: 200,
                hide: (this.visibleCols && !this.visibleCols.ownername)
            },
            {
                headerName: 'TABLE.providername',
                field: 'providername',
                cellClass: 'table-cell-left',
                width: 200,
                hide: (this.visibleCols && !this.visibleCols.providername)
            },
            {
                headerName: 'TABLE.transportnumber',
                field: 'transportnumber',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.transportnumber),
                cellRenderer: function (params) {
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';
                    var icon = document.createElement('i');
                    icon.classList.add('table-cell-icon', 'fa');
                    if (params.data.state === 0) {
                        icon.classList.add('fa-train');
                    }
                    else if (params.data.state === 1) {
                        icon.classList.add('fa-balance-scale');
                    }
                    else if (params.data.state === 2) {
                        icon.classList.add('fa-map-signs');
                    }
                    else if (params.data.state === 3) {
                        icon.classList.add('fa-trash');
                    }
                    else if (params.data.state === 4) {
                        icon.classList.add('fa-road');
                    }
                    else {
                        icon.classList.add('fa-bell');
                    }
                    element.appendChild(icon);
                    element.appendChild(document.createTextNode(params.value));
                    return element;
                }
            },
            {
                headerName: 'TABLE.invoicenumber',
                field: 'invoicenumber',
                width: 100,
                cellClass: 'table-cell-center',
                hide: (this.visibleCols && !this.visibleCols.invoicenumber)
            },
            {
                headerName: 'TABLE.regdate',
                field: 'regdate',
                width: 120,
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                hide: (this.visibleCols && !this.visibleCols.regdate)
            },
            {
                headerName: 'TABLE.sampleroutdate',
                field: 'sampleroutdate',
                width: 120,
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                hide: (this.visibleCols && !this.visibleCols.sampleroutdate)
            },
            {
                headerName: 'TABLE.sendernname',
                field: 'sendernname',
                width: 200,
                cellClass: 'table-cell-left',
                hide: (this.visibleCols && !this.visibleCols.sendernname)
            },
            {
                headerName: 'TABLE.stationname',
                field: 'stationname',
                width: 200,
                cellClass: 'table-cell-left',
                hide: (this.visibleCols && !this.visibleCols.stationname)
            },
            {
                headerName: 'TABLE.cropfullname',
                field: 'cropfullname',
                cellClass: 'table-cell-left',
                width: 180,
                hide: (this.visibleCols && !this.visibleCols.cropfullname)
            },
            {
                headerName: 'TABLE.gmopresence',
                field: 'gmopresence',
                cellClass: 'table-cell-center',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.gmopresence),
                cellRenderer: function (params) {
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';
                    var icon = document.createElement('i');
                    // TODO: check values
                    if (params.data.gmopresence === 0) {
                        icon.classList.add('fa', 'fa-check-square-o');
                    }
                    else {
                        icon.classList.add('fa', 'fa-square-o');
                    }
                    element.appendChild(icon);
                    return element;
                }
            },
            {
                headerName: 'TABLE.certificatenumber',
                field: 'certificatenumber',
                cellClass: 'table-cell-center',
                width: 100,
                cellRenderer: function (params) {
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';
                    if (params.value !== null) {
                        var icon = document.createElement('i');
                        icon.classList.add('table-cell-icon', 'fa');
                        if (params.data.certificatepresence === '+') {
                            icon.classList.add('fa-check-square-o');
                        }
                        else {
                            icon.classList.add('fa-square-o');
                        }
                        element.appendChild(icon);
                        element.appendChild(document.createTextNode(params.value));
                    }
                    return element;
                },
                hide: (this.visibleCols && !this.visibleCols.certificatenumber)
            },
            {
                headerName: 'TABLE.certificatedate',
                field: 'certificatedate',
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.certificatedate)
            },
            {
                headerName: 'TABLE.snnumber',
                field: 'snnumber',
                cellClass: 'table-cell-center',
                width: 130,
                cellRenderer: function (params) {
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';
                    if (params.value !== null) {
                        var icon = document.createElement('i');
                        icon.classList.add('table-cell-icon', 'fa');
                        if (params.data.snpresence === '+') {
                            icon.classList.add('fa-check-square-o');
                        }
                        else {
                            icon.classList.add('fa-square-o');
                        }
                        element.appendChild(icon);
                        element.appendChild(document.createTextNode(params.value));
                    }
                    return element;
                },
                hide: (this.visibleCols && !this.visibleCols.snnumber)
            },
            {
                headerName: 'TABLE.invoicegross',
                field: 'invoicegross',
                cellClass: 'table-cell-right',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.invoicegross)
            },
            {
                headerName: 'TABLE.invoicetare',
                field: 'invoicetare',
                cellClass: 'table-cell-right',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.invoicetare)
            },
            {
                headerName: 'TABLE.invoicenet',
                field: 'invoicenet',
                cellClass: 'table-cell-right',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.invoicenet)
            },
            {
                headerName: 'TABLE.grosstime',
                field: 'grosstime',
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.grosstime)
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.deviationtime)
            },
            {
                headerName: 'TABLE.taretime',
                field: 'taretime',
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.taretime)
            },
            {
                headerName: 'TABLE.gross',
                field: 'gross',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.gross)
            },
            {
                headerName: 'TABLE.tare',
                field: 'tare',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.tare)
            },
            {
                headerName: 'TABLE.net',
                field: 'net',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.net)
            },
            {
                headerName: 'TABLE.grossdeficite',
                field: 'grossdeficite',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.grossdeficite)
            },
            {
                headerName: 'TABLE.netdeficite',
                field: 'netdeficite',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.netdeficite)
            },
            {
                headerName: 'TABLE.scaletypename',
                field: 'scaletypename',
                cellClass: 'table-cell-center',
                width: 180,
                hide: (this.visibleCols && !this.visibleCols.scaletypename)
            },
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 250,
                hide: (this.visibleCols && !this.visibleCols.deviationdescription)
            },
            {
                headerName: 'TABLE.permission',
                cellClass: 'table-cell-center',
                children: [
                    {
                        headerName: 'TABLE.permissiondescription',
                        field: 'permissiondescription',
                        cellClass: 'table-cell-left',
                        width: 200,
                        hide: (this.visibleCols && !this.visibleCols.permissiondescription)
                    },
                    {
                        headerName: 'TABLE.permissiontime',
                        field: 'permissiontime',
                        cellClass: 'table-cell-center',
                        cellRenderer: function (params) {
                            return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                        width: 150,
                        hide: (this.visibleCols && !this.visibleCols.permissiontime)
                    },
                    {
                        headerName: 'TABLE.permissionusername',
                        field: 'permissionusername',
                        cellClass: 'table-cell-left',
                        width: 200,
                        hide: (this.visibleCols && !this.visibleCols.permissionusername)
                    }]
            },
            {
                headerName: 'TABLE.confirmation',
                cellClass: 'table-cell-center',
                children: [
                    {
                        headerName: 'TABLE.confirmationtime',
                        field: 'confirmationtime',
                        cellClass: 'table-cell-center',
                        cellRenderer: function (params) {
                            return _this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                        width: 150,
                        hide: (this.visibleCols && !this.visibleCols.confirmationtime)
                    },
                    {
                        headerName: 'TABLE.confirmationusername',
                        field: 'confirmationusername',
                        cellClass: 'table-cell-left',
                        width: 200,
                        hide: (this.visibleCols && !this.visibleCols.confirmationusername)
                    }
                ]
            },
            {
                headerName: 'TABLE.waitingtime',
                field: 'waitingtime',
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    // TODO: cannont create a pipe DateDefPipe:[format]
                    var hrs = Math.floor(params.value / 60 / 60 / 1000);
                    var def = params.value - hrs * 60 * 60 * 1000;
                    var min = Math.floor(def / 60 / 1000);
                    var hrsSt = (hrs > 10) ? '' + hrs : '0' + hrs;
                    var minSt = (min > 10) ? '' + min : '0' + min;
                    return hrsSt + ':' + minSt;
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.waitingtime)
            },
            {
                headerName: 'TABLE.overtime',
                field: 'overtime',
                cellClass: 'table-cell-center',
                cellRenderer: function (params) {
                    var hrs = Math.floor(params.value / 60 / 60 / 1000);
                    var def = params.value - hrs * 60 * 60 * 1000;
                    var min = Math.floor(def / 60 / 1000);
                    var hrsSt = (hrs > 10) ? '' + hrs : '0' + hrs;
                    var minSt = (min > 10) ? '' + min : '0' + min;
                    return hrsSt + ':' + minSt;
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.overtime)
            },
            {
                headerName: 'TABLE.remark',
                field: 'remark',
                cellClass: 'table-cell-left',
                width: 250,
                hide: (this.visibleCols && !this.visibleCols.remark)
            }
        ];
    };
    RailcarListComponent.prototype.createGridOptions = function () {
        var _this = this;
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.RailcarList,
            rowDeselection: true,
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
            getRowClass: function (params) {
                var carloadClass = '';
                if (params.data.state === 0) {
                    carloadClass = 'grid-success';
                }
                else if (params.data.state === 1) {
                    carloadClass = 'grid-accepted';
                }
                else if (params.data.state === 2) {
                    carloadClass = 'grid-returned';
                }
                else if (params.data.state === 3) {
                    carloadClass = 'grid-deleted';
                }
                else if (params.data.state === 4) {
                    carloadClass = 'grid-routed';
                }
                else {
                    carloadClass = 'grid-alarmed';
                }
                return carloadClass;
            },
            onSelectionChanged: function () {
                var _sel = _this.gridOptions.api.getSelectedRows();
                if ((_sel.length > 0)
                    && (_this.selected)
                    && (_this.selected.inventoryid === _sel[0].inventoryid)) {
                    _this.selected = {};
                    _this.gridOptions.api.deselectAll();
                }
                else {
                    _this.selected = _sel[0];
                }
                _this.setSelect(_this.selected);
                // this._select.selectRailcar(this.selected);
            },
            onGridReady: function () {
                // TODO: grid ready
            },
            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true
        };
    };
    RailcarListComponent.prototype.setSelect = function (_val) {
        this.selected = _val;
        this._select.selectRailcar(_val);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], RailcarListComponent.prototype, "filter", null);
    RailcarListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-railcar-list',
            templateUrl: './railcar-list.component.html',
        }), 
        __metadata('design:paramtypes', [railcars_service_1.RailcarService, filter_data_service_1.DataFilterService, storage_service_1.LocalStorageService, refresh_service_1.RefreshService, select_railcar_service_1.SelectRailcarService, ng2_translate_1.TranslateService])
    ], RailcarListComponent);
    return RailcarListComponent;
}());
exports.RailcarListComponent = RailcarListComponent;

//# sourceMappingURL=railcar-list.component.js.map
