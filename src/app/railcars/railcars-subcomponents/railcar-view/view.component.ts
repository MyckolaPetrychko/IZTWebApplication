import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LocalStorageService } from '../../../shared/services/storage.service';
import { VisibilityConf } from './view.model';
import {  TranslatePipe } from 'ng2-translate/ng2-translate';
// import { AlertComponent } from '../../../shared/alert/alert.component';

 @Component({
    moduleId: module.id,
    selector: 'wblg-visibility-conf',
    templateUrl: './view.component.html',
    // pipes: [TranslatePipe],
    // directives: [AlertComponent] 
})
export class VisibilityConfigComponent implements OnInit {
    public propertiesBase: string[];
    public propertiesColsPart1: string[];
    public propertiesColsPart2: string[];


    public cols: VisibilityConf;
    public isPrintType: boolean;


    constructor(private _storage: LocalStorageService) {
        this.cols = new VisibilityConf();
        this.propertiesBase = [];
        this.propertiesColsPart1 = [];
        this.propertiesColsPart2 = [];

        this.isPrintType = false;
    }

    ngOnInit() {
        if (this.isPrintType) {
            this.cols = this._storage.getViewPrintFromStorage()
        } else {
            this.cols = this._storage.getViewFromStorage();
        }

        this.propertiesBase = Object.keys(this.cols);
        this.propertiesBase.pop();
        let prop: string[] = Object.keys(this.cols.cols);
        let half: number = Math.floor(prop.length / 2);
        prop.forEach((item, i): void => {
            if (i <= half) {
                this.propertiesColsPart1.push(item);
            } else {
                this.propertiesColsPart2.push(item);
            }
        });
    }

    public changeProperty( _prop : string):void {
        this.cols[_prop] = !this.cols[_prop];
        this.onSave();
    }

    public onSave(): void {
        if (this.isPrintType) {
            this._storage.saveViewPrintToStorage(this.cols)
        } else {
            this._storage.saveViewToStorage(this.cols);
        }
    }

}
