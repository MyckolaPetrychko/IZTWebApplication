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
var user_service_1 = require('../../auth/user.service');
var auth_service_1 = require('../../auth/auth.service');
var NavComponent = (function () {
    function NavComponent(_user, _auth) {
        this._user = _user;
        this._auth = _auth;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isLogined = this._user.isLogined();
        this._userChangeSub = this._user.userChangeAnnonced
            .subscribe(function () {
            _this._isLogined = _this._user.isLogined();
        });
    };
    NavComponent.prototype.ngOnDestroy = function () {
        this._userChangeSub.unsubscribe();
    };
    NavComponent.prototype.logout = function () {
        this._auth.logout();
    };
    NavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-nav',
            templateUrl: 'nav.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, auth_service_1.AuthService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;

//# sourceMappingURL=nav.component.js.map
