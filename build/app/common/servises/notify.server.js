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
var Subject_1 = require('rxjs/Subject');
var NotifyService = (function () {
    function NotifyService() {
        // Observable string sources
        this.refreshInfoSource = new Subject_1.Subject();
        this.selectedSource = new Subject_1.Subject();
        // Observable string streams
        this.refreshAnnonced = this.refreshInfoSource.asObservable();
        this.selectedAnnonced = this.selectedSource.asObservable();
    }
    // Service message commands
    NotifyService.prototype.refreshData = function () {
        this.refreshInfoSource.next('');
    };
    NotifyService.prototype.selectedRailcar = function (_selected) {
        this.selectedSource.next(_selected);
    };
    NotifyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotifyService);
    return NotifyService;
}());
exports.NotifyService = NotifyService;

//# sourceMappingURL=notify.server.js.map
