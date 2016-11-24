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
var ModalComponent = (function () {
    function ModalComponent(elem) {
        this.elem = elem;
        this.id = 'modalID';
        this.openChange = new core_1.EventEmitter();
        this.OkPressed = new core_1.EventEmitter();
        this.CancelPressed = new core_1.EventEmitter();
        this._tabIndex = -1;
        this.visible = false;
        this.type = 'info';
        this.modal = false;
        this.closeBtn = false;
    }
    Object.defineProperty(ModalComponent.prototype, "type", {
        set: function (_type) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "message", {
        set: function (_message) {
            this.mess = _message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "open", {
        set: function (_visible) {
            // let el : HTMLElement = document.getElementById(this.id);
            this.visible = _visible || false;
            // if (this.visible) { this.elem.nativeElement.focus(); };
            // console.log(this.elem);
            //             console.log(this.id + 'id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "time", {
        set: function (_t) {
            var _this = this;
            window.setTimeout(function () {
                _this.open = false;
            }, _t * 1000);
        },
        enumerable: true,
        configurable: true
    });
    // @HostListener('blur') onBlur() {
    //     this.close();
    // }
    ModalComponent.prototype.onClickmain = function () {
        this.close();
    };
    ModalComponent.prototype.OnKeyUp = function (event) {
        //   if (event.keyCode === 27) {
        //     this.close();
        // }
        // console.log(event);
    };
    ModalComponent.prototype.ngOnInit = function () {
        // console.log(this.type + ' ' + this.visible);
    };
    ModalComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
        }
    };
    ModalComponent.prototype.ok = function () {
        console.log('modal ok');
        this.OkPressed.emit('true');
        this.visible = false;
        this.openChange.emit(false);
    };
    ModalComponent.prototype.cancel = function () {
        this.CancelPressed.emit('true');
        this.visible = false;
        this.openChange.emit(false);
    };
    ModalComponent.prototype.close = function () {
        this.visible = false;
        this.openChange.emit(false);
    };
    ModalComponent.prototype.onclickChild = function (event) {
        event.stopPropagation();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], ModalComponent.prototype, "type", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], ModalComponent.prototype, "message", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], ModalComponent.prototype, "open", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ModalComponent.prototype, "small", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ModalComponent.prototype, "modal", void 0);
    __decorate([
        core_1.Input('close'), 
        __metadata('design:type', Boolean)
    ], ModalComponent.prototype, "closeBtn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], ModalComponent.prototype, "time", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "openChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "OkPressed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "CancelPressed", void 0);
    __decorate([
        core_1.HostBinding('tabindex'), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "_tabIndex", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-modal',
            templateUrl: 'modal.component.html',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;

//# sourceMappingURL=modal.component.js.map
