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
var railcars_service_1 = require('../../common/services/railcars-http/railcars.service');
// import { DataComboboxComponent } from '../.././../shared/data-combobox/data-combobox.component';
// import { AlertComponent } from '../../../shared/alert/alert.component';
// import { MyDatePicker } from '../../../shared/my-date-picker/my-date-picker.component';
var filter_data_service_1 = require('../../common/services/filters-data/filter-data.service');
// import { RailcarNumberValidator} from '../../../common/directives/railcar-number.validator';
var RailcarEditComponent = (function () {
    function RailcarEditComponent(_router, _route, _railcars, _filters) {
        this._router = _router;
        this._route = _route;
        this._railcars = _railcars;
        this._filters = _filters;
        this.railcar = {};
        this.template = {};
        this.visibility = false;
        this.useTemplate = false;
        this.disableForm = false;
    }
    RailcarEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscribeRouter = this._router.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.disableForm = false;
            var template = params['template'];
            if (_this.id !== 'add') {
                _this.typeMode = 'EDIT';
                _this.cancelName = 'CANCEL';
                _this.useTemplate = false;
                _this.getRailcar(_this.id);
            }
            else {
                _this.useTemplate = true;
                _this.typeMode = 'ADD';
                _this.cancelName = 'RESET';
                _this.railcar = {};
                if (template) {
                    _this.getRailcar(template);
                }
                else {
                    _this.useTemplate = false;
                }
            }
        });
        this.loadDataForFilters();
    };
    RailcarEditComponent.prototype.ngOnDestroy = function () {
        this._subscribeRouter.unsubscribe();
    };
    RailcarEditComponent.prototype.save = function () {
        var _this = this;
        if (this.typeMode === 'ADD') {
            this._railcars.addRailcar(this.railcar).subscribe(function (val) {
                _this.setMessage('MESSAGE.RAILCAR.SUCCESS_ADDET', 5, 'info');
            }, function (err) {
                _this.setMessage(err, 0, 'error');
            });
        }
        else {
            this._railcars.updateRailcar(this.railcar).subscribe(function (val) {
                _this.setMessage('MESSAGE.RAILCAR.SUCCESS_EDIT', 5, 'info');
            }, function (err) {
                _this.setMessage(err, 0, 'error');
            });
        }
    };
    RailcarEditComponent.prototype.getRailcar = function (id) {
        var _this = this;
        this.setMessage('MESSAGE.LOADING', 2);
        this._railcars.getRailcarId(id).subscribe(function (val) {
            if (!_this.useTemplate) {
                _this.railcar = val;
                // TOD0: Bookmark state check; 
                _this.disableForm = (val.state < 0);
            }
            else {
                _this.template = val;
            }
        }, function (err) {
            _this.setMessage(err, 0, 'error');
        });
    };
    RailcarEditComponent.prototype.setTemplate = function () {
        var _this = this;
        if (this.template) {
            this.railcar = this.template;
            console.log(this.template);
            var unprop = void 0;
            unprop = ['inventoryid',
                'transportnumber',
                'sampleroutdate',
                'invoicenumber',
                'invoicedate',
                'invoicenet',
                'invoicegross',
                'invoicetare'];
            unprop.forEach(function (prop) {
                _this.railcar[prop] = null;
            });
            console.log(this.railcar);
        }
        else {
            this.setMessage('MESSAGE.TEMPLATE_NOT_SET', 5, 'warn');
        }
    };
    RailcarEditComponent.prototype.cancel = function () {
        if (this.typeMode === 'ADD') {
            this.railcar = {};
        }
        else {
            // TODO: back or list
            this._route.navigate(['/railcars', { id: this.id }]);
        }
    };
    RailcarEditComponent.prototype.loadDataForFilters = function () {
        var _this = this;
        this._filters.getCulturesList().subscribe(function (val) {
            _this._cultures = val;
        });
        this._filters.getStationsList().subscribe(function (val) {
            _this._stations = val;
        });
        this._filters.getScalesTypeList().subscribe(function (val) {
            _this._scales = val;
        });
        this._filters.getStoragessList().subscribe(function (val) {
            _this._srorages = val;
        });
        this._filters.getSendersList().subscribe(function (val) {
            _this._senders = val;
        });
        this._filters.getOwnersList().subscribe(function (val) {
            _this._owners = val;
        });
        this._filters.getProvidersList().subscribe(function (val) {
            _this._providers = val;
        });
    };
    RailcarEditComponent.prototype.setGrossWeight = function () {
        var sum = 0;
        if (!!this.railcar.invoicenet) {
            sum += +this.railcar.invoicenet;
        }
        if (!!this.railcar.invoicetare) {
            sum += +this.railcar.invoicetare;
        }
        this.railcar.invoicegross = sum;
    };
    RailcarEditComponent.prototype.setMessage = function (_mess, _time, _type) {
        if (_type === void 0) { _type = 'info'; }
        this.message = _mess;
        this.time = _time;
        this.type = _type;
        this.visibility = true;
    };
    RailcarEditComponent.prototype.changeCulture = function () {
        var _this = this;
        if (this.railcar
            && '' + this.railcar.cropid
            && this.railcar.cropid !== null
            && this.railcar.cropid !== undefined) {
            this._filters.getCultureClassesList(this.railcar.cropid).subscribe(function (val) {
                _this._classes = val;
            });
            this._filters.getCultureSortesList(this.railcar.cropid).subscribe(function (val) {
                _this._sorts = val;
            });
        }
        else {
            this._classes = [];
            this._sorts = [];
        }
    };
    RailcarEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-railcar-edit',
            templateUrl: 'railcar-edit.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, railcars_service_1.RailcarService, filter_data_service_1.DataFilterService])
    ], RailcarEditComponent);
    return RailcarEditComponent;
}());
exports.RailcarEditComponent = RailcarEditComponent;

//# sourceMappingURL=railcar-edit.component.js.map
