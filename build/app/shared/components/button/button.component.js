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
var ButtonComponent = (function () {
    // @Output() click = new EventEmitter();
    function ButtonComponent() {
        this.valueChange = new core_1.EventEmitter();
        this.icon = '';
        this.checable = false;
        this.view = ['light'];
        this.text = 'Default';
        //this.translateText = 'Default';
        this.value = false;
    }
    ButtonComponent.prototype.clickedBtn = function () {
        if (this.checable) {
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
        //  this.click.emit('');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ButtonComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ButtonComponent.prototype, "checable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ButtonComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ButtonComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ButtonComponent.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ButtonComponent.prototype, "translateText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ButtonComponent.prototype, "text", void 0);
    ButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-button',
            templateUrl: './button.component.html',
            styleUrls: ['./button.component.css'],
            directives: [common_1.NgClass, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonComponent);
    return ButtonComponent;
}());
exports.ButtonComponent = ButtonComponent;

//# sourceMappingURL=button.component.js.map
