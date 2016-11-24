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
var auth_constant_1 = require('./auth.constant');
var user_roles_model_1 = require('./user-roles.model');
var UserService = (function () {
    function UserService() {
        this._isLogined = false;
        this._role = null;
        this._roles = user_roles_model_1.USER_ROLES;
        this.currentUser = {};
        this.userSource = new Subject_1.Subject();
        this.userChangeAnnonced = this.userSource.asObservable();
        if (this.isUserInLocalStorage()) {
            this.changeUser(this.getUserFromStorage());
        }
    }
    UserService.prototype.changeUser = function (_user) {
        if (!!_user
            && !!('' + _user.id)
            && _user.id !== null
            && _user.id !== undefined) {
            console.info('User is auth' + _user.username);
            this.currentUser = _user;
            this._isLogined = true;
            this._role = this.currentUser.roles[0];
            this.saveUser();
        }
        else {
            console.warn('User is not auth' + _user.username);
            this._isLogined = false;
            this._role = null;
            this.currentUser = null;
            this.deleteUserFromStorage();
        }
        this.userSource.next(this.currentUser);
    };
    UserService.prototype.isLogined = function () {
        console.log('Is logined' + this._isLogined);
        return (this._isLogined);
    };
    UserService.prototype.isAuth = function (_role) {
        return (this._isLogined
            && this._role
            && (this._roles[_role].indexOf(this._role) !== -1));
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    UserService.prototype.saveUser = function () {
        window.sessionStorage.setItem(auth_constant_1.USER_LOCAL_STRORAGE_CONSTANT, JSON.stringify(this.currentUser));
    };
    UserService.prototype.getUserFromStorage = function () {
        return JSON.parse(window.sessionStorage.getItem(auth_constant_1.USER_LOCAL_STRORAGE_CONSTANT));
    };
    UserService.prototype.isUserInLocalStorage = function () {
        return !!window.sessionStorage.getItem(auth_constant_1.USER_LOCAL_STRORAGE_CONSTANT);
    };
    UserService.prototype.deleteUserFromStorage = function () {
        window.sessionStorage.removeItem(auth_constant_1.USER_LOCAL_STRORAGE_CONSTANT);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

//# sourceMappingURL=user.service.js.map
