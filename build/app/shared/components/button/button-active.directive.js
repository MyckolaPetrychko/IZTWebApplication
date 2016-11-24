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
var WblgBtnActiveDirective = (function () {
    function WblgBtnActiveDirective(el) {
        this.el = el.nativeElement;
        this._defaultActiveClass = 'btn-active';
        this.activity = false;
    }
    Object.defineProperty(WblgBtnActiveDirective.prototype, "activeClass", {
        set: function (_class) {
            this._activeClass = _class || this._defaultActiveClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WblgBtnActiveDirective.prototype, "active", {
        set: function (_val) {
            this.activity = _val || false;
        },
        enumerable: true,
        configurable: true
    });
    WblgBtnActiveDirective.prototype.ngOnInit = function () {
        this.changeActivityClass(this.activity);
    };
    WblgBtnActiveDirective.prototype.onMouseClick = function () {
        this.activity = !this.activity;
        this.changeActivityClass(this.activity);
    };
    WblgBtnActiveDirective.prototype.changeActivityClass = function (_active) {
        if (_active) {
            this.el.classList.add(this._activeClass);
        }
        else {
            this.el.classList.remove(this._activeClass);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], WblgBtnActiveDirective.prototype, "activeClass", null);
    __decorate([
        core_1.Input('wblgBtnActive'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], WblgBtnActiveDirective.prototype, "active", null);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], WblgBtnActiveDirective.prototype, "onMouseClick", null);
    WblgBtnActiveDirective = __decorate([
        core_1.Directive({
            selector: '[wblgBtnActive]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], WblgBtnActiveDirective);
    return WblgBtnActiveDirective;
}());
exports.WblgBtnActiveDirective = WblgBtnActiveDirective;

//# sourceMappingURL=button-active.directive.js.map
