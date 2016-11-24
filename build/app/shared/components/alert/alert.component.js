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
// import { TranslatePipe } from 'ng2-translate';
var AlertComponent = (function () {
    function AlertComponent() {
        this.small = false;
        this.big = false;
        this.modal = false;
        this.openChange = new core_1.EventEmitter();
        this.visible = false;
        this.type = 'info';
        this.modal = false;
        this.timerClose = 0;
    }
    Object.defineProperty(AlertComponent.prototype, "type", {
        set: function (_type) {
            this.setType(_type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "message", {
        set: function (_message) {
            this.setMess(_message);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertComponent.prototype, "open", {
        set: function (_visible) {
            var _this = this;
            this.visible = _visible || false;
            if (this.time > 0) {
                window.setTimeout(function () {
                    _this.close();
                }, +this.time * 1000);
            }
        },
        enumerable: true,
        configurable: true
    });
    AlertComponent.prototype.ngOnInit = function () {
        // console.log(this.type + ' ' + this.visible);
    };
    AlertComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName === 'type') {
                this.setType(changes[propName].currentValue);
            }
            else if (propName === 'message') {
                this.setMess(changes[propName].currentValue);
            }
        }
    };
    AlertComponent.prototype.close = function () {
        // this.time = 5;
        this.visible = false;
        this.openChange.emit(false);
    };
    AlertComponent.prototype.setType = function (_type) {
        if (_type === 'info') {
            this.iconClass = 'fa-info';
            this.typeClass = 'alert-info-message';
            this.typeTitle = 'ALERT.INFO';
        }
        else if (_type === 'warn') {
            this.iconClass = 'fa-warning';
            this.typeClass = 'alert-warn-message';
            this.typeTitle = 'ALERT.WARNING';
        }
        else if (_type === 'error') {
            this.iconClass = 'fa-remove';
            this.typeClass = 'alert-error-message';
            this.typeTitle = 'ALERT.ERROR';
        }
        else {
            this.iconClass = 'fa-bug';
            this.typeClass = 'alert-bug-message';
            this.typeTitle = 'ALERT.BUG';
        }
    };
    AlertComponent.prototype.setMess = function (_mess) {
        if (this.big) {
            this.typeTitle = _mess;
        }
        else {
            this.mess = _mess;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], AlertComponent.prototype, "type", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AlertComponent.prototype, "time", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], AlertComponent.prototype, "message", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], AlertComponent.prototype, "open", null);
    __decorate([
        core_1.Input('close'), 
        __metadata('design:type', Boolean)
    ], AlertComponent.prototype, "closeBtn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AlertComponent.prototype, "small", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AlertComponent.prototype, "big", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AlertComponent.prototype, "modal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AlertComponent.prototype, "openChange", void 0);
    AlertComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-alert',
            templateUrl: 'alert.component.html',
            // styleUrls: ['alert.component.css'],
            directives: [common_1.NgClass, common_1.NgIf],
        }), 
        __metadata('design:paramtypes', [])
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;

//# sourceMappingURL=alert.component.js.map
