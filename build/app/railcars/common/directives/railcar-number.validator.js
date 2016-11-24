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
exports.RAILCAR_NUMBER_CONTROL_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return RailcarNumberValidator; }),
    multi: true
};
var RailcarNumberValidator = (function () {
    function RailcarNumberValidator() {
        // @todo constructor
    }
    RailcarNumberValidator.prototype.validate = function (c) {
        // self value (e.g. retype password)
        var v = c.value;
        var str_v = '' + v;
        var LEN = 8;
        if (str_v.length !== LEN) {
            return {
                railcarNumber: true
            };
        }
        else {
            /*
            Номер вагона: 7 4 8 5 4 6 8 8
            Множник: 2 1 2 1 2 1 2
            Розрядні добутки: 14 4 16 5 8 6 16
            Порозрядна сума: 1+4+4+1+6+5+8+6+1+6=42
            Порозрядна сума, яка визначається як сума цифр, округляєьться до повного десятка (тобто 50)
            і від нього віднімається (50-42) – ця цифра і буде контрольною (8).
             */
            var numbers = [];
            var multiplers = [];
            var summators_1 = [];
            var i = 0;
            var v_raz = v;
            for (i = 0; i < LEN; i++) {
                var val = Math.floor(v_raz / Math.pow(10, (LEN - i - 1)));
                numbers.push(val);
                multiplers.push(val);
                if (i === (LEN - 1)) {
                    multiplers.pop();
                }
                v_raz -= numbers[i] * Math.pow(10, (LEN - i - 1));
            }
            for (i = 0; i < LEN - 1; i += 2) {
                if ((i % 2) === 0) {
                    multiplers[i] = numbers[i] * 2;
                }
            }
            multiplers.forEach(function (item) {
                if (item > 9) {
                    summators_1.push(Math.floor(item / 10));
                    summators_1.push(Math.floor(item % 10));
                }
                else {
                    summators_1.push(item);
                }
            });
            var total = summators_1.reduce(function (a, b) {
                return a + b;
            });
            var control = (10 - (total - Math.floor(total / 10) * 10)) % 10;
            if (control !== numbers[LEN - 1]) {
                return {
                    railcarNumber: true
                };
            }
            return null;
        }
    };
    RailcarNumberValidator = __decorate([
        core_1.Directive({
            selector: '[railcarNumber][formControlName],[railcarNumber][formControl],[railcarNumber][ngModel]',
            providers: [
                exports.RAILCAR_NUMBER_CONTROL_VALIDATOR
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RailcarNumberValidator);
    return RailcarNumberValidator;
}());
exports.RailcarNumberValidator = RailcarNumberValidator;

//# sourceMappingURL=railcar-number.validator.js.map
