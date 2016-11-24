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
var forms_1 = require('@angular/forms');
// import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { ValueFilterPipe } from '../../common/pipes/value-filter.pipe';
// import { TranslatePipe } from 'ng2-translate';
var noop = function () {
    // console.log('noop');
};
exports.COMBOBOX_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ComboboxComponent; }),
    multi: true
};
var ComboboxComponent = (function () {
    function ComboboxComponent() {
        this.data = [];
        this.dropdown = false;
        this.idName = 'comboboxID';
        //The internal data model
        this.innerValue = '';
        // private classSettingsObj: any;
        //Placeholders for the callbacks which are later providesd
        //by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.data = [];
    }
    ComboboxComponent.prototype.SelectElement = function (elem) {
        this.value = elem;
        if (elem === 'No data present') {
            this.value = '';
        }
        this.ToogleMenu(false);
    };
    ComboboxComponent.prototype.ToogleMenu = function (state) {
        if (state) {
            this.value = '';
        }
        if (this.dropdown) {
            this.isOpenedMenu = state;
        }
    };
    Object.defineProperty(ComboboxComponent.prototype, "value", {
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
    ComboboxComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    //From ControlValueAccessor interface
    ComboboxComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    //From ControlValueAccessor interface
    ComboboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    ComboboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ComboboxComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ComboboxComponent.prototype, "dropdown", void 0);
    __decorate([
        core_1.Input('id'), 
        __metadata('design:type', String)
    ], ComboboxComponent.prototype, "idName", void 0);
    ComboboxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-combobox',
            templateUrl: './combobox.component.html',
            // styleUrls: ['./combobox.component.css'],
            // directives: [NgIf, NgClass],
            // pipes: [ValueFilterPipe, TranslatePipe],
            providers: [exports.COMBOBOX_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], ComboboxComponent);
    return ComboboxComponent;
}());
exports.ComboboxComponent = ComboboxComponent;

//# sourceMappingURL=combobox.component.js.map
