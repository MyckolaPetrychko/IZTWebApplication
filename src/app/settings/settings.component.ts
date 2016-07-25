import { Component, OnInit } from '@angular/core';

import { DropDownListComponent } from './userlist/user-list.component';

@Component({
    moduleId: module.id,
    selector: 'wblg-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    directives: [DropDownListComponent]
})
export class SettingsComponent implements OnInit {
    selectedButton: string;

    constructor() {
        this.selectedButton = '';
    }

    ngOnInit() {
    }

    defineActiveButton(selectedObj: any) {
        switch (selectedObj) {
            case "add":
                this.selectedButton = selectedObj;
                break;
            case "edit":
                this.selectedButton = selectedObj;
                break;
            case "delete":
                this.selectedButton = selectedObj;
                break;
            default:
                this.selectedButton = '';
                break;
        }
    }
}