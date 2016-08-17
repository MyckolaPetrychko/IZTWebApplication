import { Component, OnInit } from '@angular/core';
// import { TranslatePipe } from 'ng2-translate';
// import { NgIf, NgClass, JsonPipe } from '@angular/common';
// import { DropDownListComponent } from './userlist/user-list.component';

@Component({
    moduleId: module.id,
    selector: 'wblg-settings',
    templateUrl: './settings.component.html',
    // styleUrls: ['./settings.component.css'],
    // directives: [DropDownListComponent],
    // pipes: [TranslatePipe, JsonPipe]
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