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
// import { TranslatePipe } from 'ng2-translate';
var noop = function () {
    // noop
};
exports.DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DataComboboxComponent; }),
    multi: true
};
var DataComboboxComponent = (function () {
    function DataComboboxComponent() {
        this.dropdown = false;
        this.idName = 'comboboxID';
        this.prop = 'id';
        this.display = 'name';
        this.selectedValue = {};
        //Placeholders for the callbacks which are later providesd
        //by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.data = [];
    }
    Object.defineProperty(DataComboboxComponent.prototype, "data", {
        set: function (_d) {
            if (_d) {
                this.dataList = _d;
                if (this.selectProperty && this.selectProperty !== '') {
                    for (var i = 0; i < this.dataList.length; i++) {
                        if (this.dataList[i][this.prop] === this.selectProperty) {
                            this.SelectElement(this.dataList[i]);
                            break;
                        }
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    DataComboboxComponent.prototype.SelectElement = function (elem) {
        this.selectedValue = elem;
        if (!elem) {
            this.selectProperty = null;
            this.filterValue = null;
        }
        else {
            this.selectProperty = elem[this.prop];
            this.filterValue = elem[this.display];
        }
        this.ToogleMenu(false);
    };
    DataComboboxComponent.prototype.ToogleMenu = function (state) {
        if (state) {
            this.selectedValue = {};
            this.filterValue = null;
        }
        if (this.dropdown) {
            this.isOpenedMenu = state;
        }
        if (this.selectedValue) {
            this.onChangeCallback(this.selectedValue[this.prop]);
        }
        else {
            this.onChangeCallback(null);
        }
    };
    DataComboboxComponent.prototype.isActive = function (item) {
        return (item.id === this.selectedValue.id);
    };
    // //get accessor
    // get value(): string | number {
    //     return this.selectedValue[this.prop];
    // };
    // //set accessor including call the onchange callback
    // set value(v: string | number) {
    //     for (var i = 0; i < this.data.length; i++) {
    //         if (this.data[i][this.prop] === v) {
    //             this.SelectElement(this.data[i]);
    //             break;
    //         }
    //     }
    // }
    //From ControlValueAccessor interface
    DataComboboxComponent.prototype.writeValue = function (value) {
        // console.log(value + ' first');
        if ((value !== undefined) && (value !== null)) {
            if (value !== this.selectedValue[this.prop]) {
                this.selectProperty = value;
                if (this.dataList.length > 0) {
                    for (var i = 0; i < this.dataList.length; i++) {
                        if (this.dataList[i][this.prop] === value) {
                            this.SelectElement(this.dataList[i]);
                            break;
                        }
                    }
                }
            }
        }
        else {
            this.SelectElement({});
        }
    };
    //From ControlValueAccessor interface
    DataComboboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    DataComboboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataComboboxComponent.prototype, "dropdown", void 0);
    __decorate([
        core_1.Input('id'), 
        __metadata('design:type', String)
    ], DataComboboxComponent.prototype, "idName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataComboboxComponent.prototype, "prop", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataComboboxComponent.prototype, "display", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataComboboxComponent.prototype, "data", null);
    DataComboboxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-combobox-data',
            templateUrl: './data-combobox.component.html',
            // directives: [NgIf, NgClass],
            // pipes: [DataFilterPipe, TranslatePipe],
            providers: [exports.DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], DataComboboxComponent);
    return DataComboboxComponent;
}());
exports.DataComboboxComponent = DataComboboxComponent;

//# sourceMappingURL=data-combobox.component.js.map
