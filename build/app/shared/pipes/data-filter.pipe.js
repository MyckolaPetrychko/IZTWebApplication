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
var DataFilterPipe = (function () {
    function DataFilterPipe() {
    }
    /**
     * Pipes for filter data for property and value
     * @example " items | dataFilter :value :property "
     * @param {IDataModel[]} items List of data
     * @param {string} value    Value for filter
     * @param {string} prop = 'id'     Property name for filtering. Default id
     * @param {string[]} args   Other values
     * @returns {IDataModel[]}  data filtered
     */
    DataFilterPipe.prototype.transform = function (items, value, prop, args) {
        if (prop === void 0) { prop = 'id'; }
        if (value) {
            var returned = void 0;
            returned = items.filter(function (item) {
                return (('' + item[prop]).indexOf(value) !== -1);
            });
            return returned;
        }
        else {
            return items;
        }
    };
    DataFilterPipe = __decorate([
        core_1.Pipe({
            name: 'dataFilter'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataFilterPipe);
    return DataFilterPipe;
}());
exports.DataFilterPipe = DataFilterPipe;

//# sourceMappingURL=data-filter.pipe.js.map
