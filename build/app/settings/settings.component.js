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
var user_list_service_1 = require('./userlist/user-list.service');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var filter_data_service_1 = require('../railcars/common/services/filters-data/filter-data.service');
var user_roles_model_1 = require('../shared/auth/user-roles.model');
var SettingsComponent = (function () {
    function SettingsComponent(userService, _translate, _filters) {
        this.userService = userService;
        this._translate = _translate;
        this._filters = _filters;
        this.selectedButton = '';
        this.currentData = {};
        this.dataSelectedRow = {};
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createColunmDef();
        this.createGridOptions();
        this.OwnersData = { value: '', label: 'LABEL.COMPANY', data: [] };
        this._filters.getOwnersList().subscribe(function (list) {
            _this.OwnersData.data = list;
        });
        this.OwnersData.data = user_roles_model_1.USER_ROLES['public'];
        this._subTranslate = this._translate.onLangChange.debounceTime(500).subscribe(function (event) {
            if (_this.gridOptions && _this.gridOptions.api) {
                _this.gridOptions.api.refreshHeader();
            }
        });
        if (this.checkCondition('add')) {
            this.currentData = {};
        }
        this.refreshData();
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this._subTranslate.unsubscribe();
    };
    SettingsComponent.prototype.ngOnChanges = function () {
        if (this.selectedButton === 'add')
            this.currentData = {};
        else {
            if (this.dataSelectedRow)
                this.currentData = this.dataSelectedRow;
            if (this.selectedButton === 'delete' && this.dataSelectedRow) {
                this.userService.deleteUser('' + this.dataSelectedRow.id);
                console.log("User " + this.dataSelectedRow.username + " was deleted!");
            }
        }
    };
    SettingsComponent.prototype.checkCondition = function (condition) {
        if (condition === this.selectedButton)
            return true;
        else
            return false;
    };
    SettingsComponent.prototype.refreshData = function () {
        var _this = this;
        this.userService.getUserList()
            .subscribe(function (res) {
            _this.UsersList = res;
        }, function (err) {
            _this.UsersList = [];
            _this.message = 'Error get data:' + JSON.stringify(err);
        });
    };
    SettingsComponent.prototype.createColunmDef = function () {
        this.columnDefs = [
            {
                headerName: 'LABEL.LOGIN',
                field: 'login',
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.FIRST_NAME',
                field: 'firstName',
                width: 150,
                hidden: false
            },
            {
                headerName: 'LABEL.LAST_NAME',
                field: 'lastName',
                width: 150,
                hidden: false
            },
            {
                headerName: 'LABEL.MIDDLE_NAME',
                field: 'middleName',
                width: 150,
                hidden: false
            },
            {
                headerName: 'E-mail',
                field: 'email',
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.NUMBER_CLIENTS',
                field: 'clients',
                width: 200,
                hidden: false
            }
        ];
    };
    SettingsComponent.prototype.createGridOptions = function () {
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
                _this.gridOptions.api.sizeColumnsToFit();
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            // getRowClass: (params: any) => {
            //     return (params.node.data.type === '0' )? 'accepted-employeer ' : 'accepted-traider ';
            // },
            suppressMovableColumns: true,
            enableSorting: true,
            //  enableFilter: true,
            headerHeight: 30,
        };
    };
    SettingsComponent.prototype.onRowClicked = function (event) {
        if (this.selectedButton === 'add')
            this.currentData = {};
        else
            console.log(event.data);
        this.currentData = event.data;
        this.dataSelectedRow = event.data;
    };
    SettingsComponent.prototype.onRowDoubleClicked = function () {
        this.defineActiveButton('edit');
    };
    SettingsComponent.prototype.onFilterChanged = function (data) {
        this.gridOptions.api.setQuickFilter(data);
    };
    SettingsComponent.prototype.translateHeaderName = function (params) {
        var translate = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe(function (val) {
            translate = val;
        });
        return translate;
    };
    SettingsComponent.prototype.defineActiveButton = function (selectedObj) {
        switch (selectedObj) {
            case "add":
                this.currentData = {};
                this.title_form = 'TITLE.ADD_USER';
                this.title_button = 'BUTTON.ADD_USER';
                this.selectedButton = selectedObj;
                this.modal = true;
                break;
            case "edit":
                this.currentData = this.dataSelectedRow;
                this.title_form = 'TITLE.EDIT_USER';
                this.title_button = 'BUTTON.EDIT_USER';
                this.selectedButton = selectedObj;
                this.modal = true;
                break;
            case "delete":
                this.currentData = this.dataSelectedRow;
                this.title_form = 'TITLE.DELETE_USER';
                this.title_button = 'BUTTON.DELETE_USER';
                this.selectedButton = selectedObj;
                this.modal = true;
                break;
            default:
                this.selectedButton = '';
                this.title_form = '';
                break;
        }
    };
    SettingsComponent.prototype.ok = function () {
        if (this.selectedButton === 'add') {
            this.userService.addUser(this.currentData);
        }
        if (this.selectedButton === 'edit') {
            this.userService.updateUser(this.currentData);
        }
        if (this.selectedButton === 'delete') {
            this.userService.deleteUser(this.currentData.id.toString());
        }
        this.selectedButton = '';
        this.modal = false;
    };
    SettingsComponent.prototype.cancel = function () {
        this.selectedButton = '';
        this.modal = false;
    };
    SettingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-settings',
            templateUrl: './settings.component.html'
        }), 
        __metadata('design:paramtypes', [user_list_service_1.UserService, ng2_translate_1.TranslateService, filter_data_service_1.DataFilterService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;

//# sourceMappingURL=settings.component.js.map
