import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import {NgFor} from '@angular/common';

// import { TranslatePipe } from 'ng2-translate';

@Component({
    moduleId: module.id,
    selector: 'wblg-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css'],
    // pipes: [TranslatePipe]
})
export class TableComponent implements OnInit, OnChanges {
    @Input() headers: any;
    @Input() colunms: any;

    @Input('data') dataList: any;

    // @Input() set rowClass(fn : Function) {
    //     this.setRowClass = fn;
    // }
    private viewedColunms: any;
    private heightTable : number;

    private tableData: { data: any, isActive: boolean }[];
    //    public headers : any;
    //    public colunms: any;
    //    public data: any;
    //    public isNumerable: boolean = true;

    private isLoading: boolean;
    constructor() {
        this.isLoading = true;
        // this.headers = [];
        // this.colunms = [];
        // this.data = [];
        this.tableData = [];
    }

    ngOnInit() {
        this.viewedColunms = this.colunms.filter((item: any) => {
            return !item.hidden;
        });
        this.isLoading = true;

        if (this.dataList.lenght > 0) {
            this.dataList.forEach((item: any) => {
                this.tableData.push({ data: item, isActive: false })
            });
        }
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}): any {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }

        // console.log('ngOnChanges - propertyName = ' + JSON.stringify(changes['colunms']));

        this.viewedColunms = this.colunms.filter((item: any) => {
            return true;
        });
                if (this.dataList.lenght > 0) {
            this.dataList.forEach((item: any) => {
                this.tableData.push({ data: item, isActive: false })
            });
        }
    }

    public onResize():void {
        this.heightTable = document.getElementById('table_railcars').offsetHeight - 70;
        console.warn(document.getElementById('table_railcars').offsetHeight);
    }

    private setRowClass(item: any): string {
        return '';
    }


}
