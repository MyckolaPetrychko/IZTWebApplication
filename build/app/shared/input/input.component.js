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
var forms_1 = require('@angular/forms');
var noop = function () {
    // 'noop';
};
exports.WBLG_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputComponent; }),
    multi: true
};
var InputComponent = (function () {
    function InputComponent() {
        this.idName = 'inputID';
        //The internal data model
        this.innerValue = '';
        //Placeholders for the callbacks which are later providesd
        //by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        // constructor
    }
    Object.defineProperty(InputComponent.prototype, "value", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    //Set touched on blur
    InputComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    //From ControlValueAccessor interface
    InputComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    //From ControlValueAccessor interface
    InputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input('id'), 
        __metadata('design:type', String)
    ], InputComponent.prototype, "idName", void 0);
    InputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-input',
            templateUrl: './input.component.html',
            directives: [common_1.NgIf, common_1.NgClass],
            providers: [exports.WBLG_INPUT_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], InputComponent);
    return InputComponent;
}());
exports.InputComponent = InputComponent;

//# sourceMappingURL=input.component.js.map
