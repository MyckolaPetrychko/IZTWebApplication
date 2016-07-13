import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';

import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions } from 'ag-grid/main';

import { TranslatePipe } from 'ng2-translate';

import { DisparityProvide } from './disparity.provider';
import { DisparityService } from './disparity.service';
import { IDisparityModel } from './disparity.model';


@Component({
    moduleId: module.id,
    selector: 'wblg-disparity-list',
    templateUrl: 'disparity.component.html',
    styleUrls: ['disparity.component.css'],
    providers: [DisparityProvide],
    directives: [NgIf, AgGridNg2],
    pipes: [TranslatePipe]
})

export class DisparityListComponent implements OnInit, OnDestroy {
    public DisparityList: IDisparityModel[];
    public isNotNull: boolean;

    public total: number;
    public accepted: number;

    public message: string;

    public toRequestLast: number;
    private REFRESH_PERIOD: number;

    private timer: any;
    private intervalRefresh: any;

    private columnDefs: any;
    private gridOptions: GridOptions;

    constructor(private _disparity: DisparityService) {
        this.isNotNull = false;
        this.total = 0;
        this.accepted = 0;
        this.message = 'Disparity list is empty';
        this.DisparityList = [];
        this.REFRESH_PERIOD = 30;

        this.toRequestLast = this.REFRESH_PERIOD;



    }

    ngOnInit() {
        this.refreshData();
        this.setReshreshDataInterval(false);

        this.createColunmDef();
        this.createGridOptions();
    }
    ngOnDestroy() {
        clearInterval(this.timer);
        clearInterval(this.intervalRefresh);
    }

    public refreshData(): void {
        this._disparity.getDisparityListCurrent()
            .subscribe(res => {

                this.DisparityList = res;
                this.total = this.DisparityList.length;
                this.accepted = 0;
                this.isNotNull = (this.total > 0);
                this.DisparityList.forEach(item => {
                    if (+item.type === 1) {
                        this.accepted++;
                    }
                });
                this.toRequestLast = this.REFRESH_PERIOD;

            },
            err => {
                this.DisparityList = [];
                this.isNotNull = false;
                this.message = 'Error get data:' + JSON.stringify(err);
            });
    }

    private setReshreshDataInterval(value: boolean = true): void {
        if (value) {
            this.timer = setInterval(() => {
                this.toRequestLast--;
            }, 1 * 1000); // to 1s* 1000ms
            this.intervalRefresh = setInterval(() => {
                this.refreshData();
            }, this.REFRESH_PERIOD * 1000); // REFRESH_PERIOD s * 1000 ms
        } else {
            clearInterval(this.timer);
            clearInterval(this.intervalRefresh);
        }
    }

    private createColunmDef(): void {
        this.columnDefs = [
            {
                 headerName: 'TABLE.proprietor', 
                 field: 'proprietor', 
                 width: 120 
            },
            { headerName: 'TABLE.supplier', field: 'supplier', width: 120  },
            { headerName: 'TABLE.carloadNumber', field: 'carloadNumber', width: 100 },
            { headerName: 'TABLE.shimpentDate', field: 'shimpentDate', width: 100 },
            { headerName: 'TABLE.station', field: 'station', width: 125 },
            { headerName: 'TABLE.culture', field: 'culture', width: 125 },
            { headerName: 'TABLE.reasonText', field: 'reasonText', width: 200 },
            { headerName: 'TABLE.reasonDate', field: 'reasonDate', width: 100 }
    
        ];
    }

    private createGridOptions(): void {
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.DisparityList,
            rowSelection: 'single',
            enableColResize: true,
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit();
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            getRowClass: (params: any) => {
               
                return (params.node.data.type === '0' )? 'accepted-employeer ' : 'accepted-traider ';
            },
            suppressMovableColumns: true,

            //  enableSorting: true,
            //  enableFilter: true,
             headerHeight: 30

        };
    }


}
