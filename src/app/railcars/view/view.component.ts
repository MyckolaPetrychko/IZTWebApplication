import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { LocalStorageService } from '../storage.service';
import { COLS } from './view.model';
import {  TranslatePipe } from 'ng2-translate';

@Component({
    moduleId: module.id,
    selector: 'subnav-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'],
    providers: [LocalStorageService],
    pipes: [TranslatePipe]
})
export class SubnavViewComponent implements OnInit {
    propertiesName: any;
    cols: COLS;

    constructor(private localService: LocalStorageService) {
        this.cols = new COLS();
    }

    ngOnInit () {
        this.propertiesName = Object.keys(this.cols);
    }

    onSave(print: HTMLInputElement) {
        print.checked ? this.localService.saveViewPrintToStorage(this.cols) :
            this.localService.saveViewToStorage(this.cols);
    }

}