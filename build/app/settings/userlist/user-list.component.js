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
var user_list_service_1 = require('./user-list.service');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var user_filter_service_1 = require('./user-filter.service');
var DropDownListComponent = (function () {
    function DropDownListComponent(userService, _filters, _translate) {
        this.userService = userService;
        this._filters = _filters;
        this._translate = _translate;
        this.selectedButtonChange = new core_1.EventEmitter();
        this.selectedButton = '';
        this.UsersList = [];
        this.message = 'Null';
        this.FiltersData = [];
        this.gridOptions = {};
        this.currentData = {};
    }
    DropDownListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createColunmDef();
        this.createGridOptions();
        this.FiltersData = [
            { value: '', label: 'LABEL.LOGIN', data: [], dropdown: false },
            { value: '', label: 'LABEL.COMPANY', data: [], dropdown: false },
            { value: '', label: 'LABEL.ROLE', data: [], dropdown: false }
        ];
        this._filters.getCompaniesList().subscribe(function (list) {
            _this.FiltersData[2].data = list;
        });
        this._subTranslate = this._translate.onLangChange.debounceTime(500).subscribe(function (event) {
            if (_this.gridOptions && _this.gridOptions.api) {
                _this.gridOptions.api.refreshHeader();
            }
        });
        this.refreshData();
    };
    DropDownListComponent.prototype.ngOnDestroy = function () {
        this._subTranslate.unsubscribe();
    };
    DropDownListComponent.prototype.ngOnChanges = function () {
        if (this.selectedButton === 'add')
            this.currentData = {};
        else {
            if (this.dataSelectedRow)
                this.currentData = this.dataSelectedRow;
            if (this.selectedButton === 'delete' && this.dataSelectedRow) {
                this.userService.deleteUser(this.dataSelectedRow.id);
                console.log("User " + this.dataSelectedRow.login + " was deleted!");
            }
        }
    };
    DropDownListComponent.prototype.refreshData = function () {
        var _this = this;
        this.userService.getUserList()
            .subscribe(function (res) {
            _this.UsersList = res;
        }, function (err) {
            _this.UsersList = [];
            _this.message = 'Error get data:' + JSON.stringify(err);
        });
    };
    DropDownListComponent.prototype.createColunmDef = function () {
        this.columnDefs = [
            {
                headerName: 'LABEL.LOGIN',
                field: 'login',
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.USERNAME',
                field: 'username',
                width: 200,
                hidden: false
            },
            {
                headerName: 'E-mail',
                field: 'email',
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.COMPANY',
                field: 'company',
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.ROLE',
                field: 'role',
                width: 200,
                hidden: false
            }
        ];
    };
    DropDownListComponent.prototype.createGridOptions = function () {
        var _this = this;
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.UsersList,
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
            onGridReady: function () {
                // this.gridOptions.api.sizeColumnsToFit();
            },
            // forPrint: false,
            // suppressHorizontalScroll: true,
            // getRowClass: (params: any) => {
            //     return (params.node.data.type === '0' )? 'accepted-employeer ' : 'accepted-traider ';
            // },
            suppressMovableColumns: true,
            //  enableSorting: true,
            //  enableFilter: true,
            headerHeight: 30,
        };
    };
    DropDownListComponent.prototype.onCellClicked = function (event) {
        if (this.selectedButton === 'add')
            this.currentData = {};
        else
            this.currentData = event.data;
        this.dataSelectedRow = event.data;
    };
    DropDownListComponent.prototype.hideForm = function () {
        this.selectedButtonChange.emit('');
    };
    DropDownListComponent.prototype.translateHeaderName = function (params) {
        var translate = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe(function (val) {
            translate = val;
        });
        return translate;
    };
    DropDownListComponent.prototype.setFilters = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDownListComponent.prototype, "selectedButton", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropDownListComponent.prototype, "selectedButtonChange", void 0);
    DropDownListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-userlist',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.css'],
        }), 
        __metadata('design:paramtypes', [user_list_service_1.UserService, user_filter_service_1.DataFilterUserService, ng2_translate_1.TranslateService])
    ], DropDownListComponent);
    return DropDownListComponent;
}());
exports.DropDownListComponent = DropDownListComponent;

//# sourceMappingURL=user-list.component.js.map
