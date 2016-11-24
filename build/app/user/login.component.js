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
var auth_service_1 = require('../shared/auth/auth.service');
var user_service_1 = require('../shared/auth/user.service');
var router_1 = require('@angular/router');
var UserLoginComponent = (function () {
    function UserLoginComponent(_user, _auth, _route, _router) {
        this._user = _user;
        this._auth = _auth;
        this._route = _route;
        this._router = _router;
        this.isErrRouterMess = false;
        this.visibility = false;
        this.mainModal = true;
        // this.setMessage('MESSAGE.LOADING', 0, 'info');
        this.user = {
            username: null,
            password: null
        };
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainModal = true;
        this._roterSub = this._router.params.subscribe(function (params) {
            _this.errRouterMess = params['message'];
            _this.isErrRouterMess = (!!_this.errRouterMess);
        });
    };
    UserLoginComponent.prototype.ngOnDestroy = function () {
        this._roterSub.unsubscribe();
    };
    UserLoginComponent.prototype.onClick = function () {
        // NOTE: fix close event by outside modal click;
        this.mainModal = true;
    };
    UserLoginComponent.prototype.login = function () {
        var _this = this;
        this._auth.login(this.user.username, this.user.password)
            .subscribe(function (data) {
            _this._user.changeUser(data);
            if (_this.isErrRouterMess) {
                _this.cancel();
            }
            else {
                _this._route.navigate(['/railcars']);
            }
        }, function (err) {
            _this._user.changeUser(null);
            _this.setMessage(err, 0, 'error');
            console.error(err);
        });
    };
    UserLoginComponent.prototype.setMessage = function (_mess, _time, _type) {
        this.message = _mess;
        this.type = _type;
        this.time = _time;
        this.visibility = true;
    };
    UserLoginComponent.prototype.cancel = function () {
        window.history.back();
    };
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], UserLoginComponent.prototype, "onClick", null);
    UserLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-login',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;

//# sourceMappingURL=login.component.js.map
