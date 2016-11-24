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
// import { TranslatePipe } from 'ng2-translate';
var user_list_service_1 = require('../user-list.service');
var UserDetailComponent = (function () {
    function UserDetailComponent(userService) {
        this.userService = userService;
        this.selectedButton = new core_1.EventEmitter();
        this.currentData = {};
        this.UserRoleList = ["traider", "user", "employeer", "admin", "anonym"];
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        if (this.checkCondition('add')) {
            this.currentData = {};
        }
    };
    UserDetailComponent.prototype.ngOnChanges = function () {
        switch (this.visible) {
            case 'add':
                this.title_form = 'TITLE.ADD_USER';
                this.title_button = 'BUTTON.ADD_USER';
                break;
            case 'edit':
                this.title_form = 'TITLE.EDIT_USER';
                this.title_button = 'BUTTON.SAVE';
                break;
            default:
                this.title_form = '';
                this.title_button = '';
                break;
        }
    };
    UserDetailComponent.prototype.addUser = function () {
        this.userService.addUser(this.currentData);
        this.hiddenEditForm();
    };
    UserDetailComponent.prototype.updateUser = function () {
        this.userService.updateUser(this.currentData);
        this.hiddenEditForm();
    };
    UserDetailComponent.prototype.deleteUser = function () {
        this.userService.deleteUser(this.currentData.id);
        this.hiddenEditForm();
    };
    UserDetailComponent.prototype.cancel = function () {
        this.hiddenEditForm();
    };
    UserDetailComponent.prototype.hiddenEditForm = function () {
        this.selectedButton.emit('');
    };
    UserDetailComponent.prototype.checkCondition = function (condition) {
        if (condition === this.visible)
            return true;
        else
            return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserDetailComponent.prototype, "currentData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UserDetailComponent.prototype, "UsersList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserDetailComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserDetailComponent.prototype, "selectedButton", void 0);
    UserDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-detail',
            templateUrl: './user-detail.component.html',
        }), 
        __metadata('design:paramtypes', [user_list_service_1.UserService])
    ], UserDetailComponent);
    return UserDetailComponent;
}());
exports.UserDetailComponent = UserDetailComponent;

//# sourceMappingURL=user-detail.component.js.map
