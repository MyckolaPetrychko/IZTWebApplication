import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { IAuthUser } from '../user-list.model';

import { UserService } from '../user-list.service';
import { UserProvide } from '../user-list.provide';

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    templateUrl: './userDetail.component.html',
    styleUrls: ['./userDetail.component.css'],
    providers: [UserService]
})

export class UserDetailComponent implements OnInit, OnChanges {
    @Input() currentData: IAuthUser;
    @Input() UsersList: IAuthUser[];
    @Input() visible: string;
    UserRoleList: string[];
    title_form: string;
    @Output() selectedButton = new EventEmitter();

    constructor(private userService: UserService) {
        this.currentData = <IAuthUser>{};
        this.UserRoleList = ["traider", "user", "employeer", "admin", "anonym"];
    }

    ngOnInit() {
        if (this.checkCondition('add')) {
            this.currentData = <IAuthUser>{};
        }
    }

    ngOnChanges() {
        switch(this.visible){
            case 'add':
                this.title_form = 'Add user';
                break;
            case 'edit':
                this.title_form = 'Edit user';
                break;
            default:
                this.title_form = '';
                break;
        }
    }

    addUser() {   
        this.userService.addUser(this.currentData);
        this.hiddenEditForm();
    }

    updateUser() {
        this.userService.updateUser(this.currentData);
        this.hiddenEditForm();
    }

    deleteUser() {
        this.userService.deleteUser(this.currentData.id);
        this.hiddenEditForm();
    }

    cancel() {
        this.hiddenEditForm();        
    }

    hiddenEditForm() {
        this.selectedButton.emit('');
    }

    public btnSubmitValue(): string {
        switch (this.visible) {
            case 'add':
                return 'Add user';
            case 'edit':
                return 'Save';
            default: return '';
        }
    }

    checkCondition(condition: string): boolean {
        if (condition === this.visible) return true;
        else return false;
    }
}