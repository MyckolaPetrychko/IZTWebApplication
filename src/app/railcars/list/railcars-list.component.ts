import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChange,
    EventEmitter }
from '@angular/core';
import {NgIf, NgClass, NgSwitch} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/common';

import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions } from 'ag-grid/main';
import { TranslatePipe } from 'ng2-translate';

// import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';
// import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/components/datepicker';

//import {DataTable, Column, LazyLoadEvent} from 'primeng/primeng';
// import {Calendar} from 'primeng/primeng';
// import {Dropdown, SelectItem} from 'primeng/primeng';


import { IRailcarModel } from '../railcars.model';
import { RailcarService } from '../railcars.service';
import { RailcarProvide } from '../railcars.provide';

import { ComboboxComponent } from '../../shared/input/input.component';
import { DataFilterRailcarService } from '../railcars-filter.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-list',
    templateUrl: './railcars-list.component.html',
    styleUrls: ['./railcars-list.component.css'],
    directives: [NgIf, NgClass, NgSwitch, ComboboxComponent, AgGridNg2],
    pipes: [TranslatePipe],
    providers: [DataFilterRailcarService]
})
export class RailcarListComponent implements OnInit, OnDestroy, OnChanges {
    public RailcarList: IRailcarModel[];
    public selected: IRailcarModel;
    public dt: Date = new Date();

    public message: string;
    public ColunmInfo: any;
    public HeaderData: any;

    public toRequestLast: number;
    private REFRESH_PERIOD: number;

    private timer: any;
    private intervalRefresh: any;
    private heightTable: number;

    private FiltersData: any;

    private columnDefs: any;
    private gridOptions: GridOptions;


    constructor(private _railcar: RailcarService, private _filters: DataFilterRailcarService) {
        this.RailcarList = [];
        this.selected = {};
        this.message = 'Null';
        this.REFRESH_PERIOD = 30;
        this.toRequestLast = this.REFRESH_PERIOD;

        // TODO: table

        this.FiltersData = [];
        this.gridOptions=<GridOptions> {};
        /*
        this.cities = [];
        this.cities.push({label:'New York', value:'New York'});
        this.cities.push({label:'Rome', value:'Rome'});
        this.cities.push({label:'London', value:'London'});
        this.cities.push({label:'Istanbul', value:'Istanbul'});
        this.cities.push({label:'Paris', value:'Paris'});
        */
    }

    ngOnInit() {
        this.refreshData();
        this.setReshreshDataInterval(false);
        this.onResize();

        this.createColunmDef();
        this.createGridOptions();

        this.FiltersData = [
            { value: '', label: 'Transportnumber', data: [], dropdown: false },
            { value: '', label: 'Invoicenumber', data: [], dropdown: false },
            { value: '', label: 'Sender (expeditor)', data: [], dropdown: true },
            { value: '', label: 'Culture name', data: [], dropdown: true },
            { value: '', label: 'Station', data: [], dropdown: true },
        ];
        this._filters.getStationsList().subscribe(list => {
            this.FiltersData[4].data = list;
        });
        this._filters.getCulturesList().subscribe(list => {
            this.FiltersData[3].data = list;
        });
        this._filters.getSendersList().subscribe(list => {
            this.FiltersData[2].data = list;
        });
    }
    ngOnDestroy() {
        clearInterval(this.timer);
        clearInterval(this.intervalRefresh);
    }
    ngOnChanges(changes: {
        [propName: string]: SimpleChange
    }) {
        for (let propName in changes) {
            //  let prop = changes[propName];
            //         this.heightTable = document.getElementById('table_railcars').offsetHeight;
            // console.warn(propName );
            // if (!prop.isFirstChange()) {


            // }
        }
    }

    public refreshData(): void {

        /*_filters
               @RequestParam( value = "begindate", required = false, defaultValue = "0") long begindatetimestump,
            @RequestParam( value = "enddate", required = false, defaultValue = "0") long enddatetimestump,
            @RequestParam( value = "astorageid", required = false, defaultValue = "1") int astorageid,
            @RequestParam( value = "showallowners", required = false, defaultValue = "0") int showallowners,
            @RequestParam( value = "shownotreceived", required = false, defaultValue = "0") int shownotreceived,
            @RequestParam( value = "showweighted", required = false, defaultValue = "1") int showweighted,
            @RequestParam( value = "showremoterecords", required = false, defaultValue = "0") int showremoterecords,
            @RequestParam( value = "showdeleted", required = false, defaultValue = "0") int showdeleted,
            @RequestParam( value = "filter_transportnumber", required = false, defaultValue = "") 
            String filter_transportnumber,
            @RequestParam( value = "filter_invoicenumber", required = false, defaultValue = "")
             String filter_invoicenumber,
            @RequestParam( value = "filter_sendernname", required = false, defaultValue = "") String filter_sendernname,
            @RequestParam( value = "filter_stationname", required = false, defaultValue = "") String filter_stationname,
            @RequestParam( value = "filter_cropname", required = false, defaultValue = "") String filter_cropname
        
        
         */
        this._railcar.getRailcarList()
            .subscribe(res => {

                this.RailcarList = res;
                this.toRequestLast = this.REFRESH_PERIOD;

            },
            err => {
                this.RailcarList = [];
                this.message = 'Error get data:' + JSON.stringify(err);
            });
    }

    public onResize(): void {
        // this.heightTable = document.getElementById('table_railcars').offsetHeight - 70;
        // console.warn(document.getElementById('table_railcars').offsetHeight);
    }

    // public loadData(event: LazyLoadEvent) {
    //     this.refreshData();
    // }

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
                headerName: 'TABLE.ownername',
                field: 'ownername',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.providername',
                field: 'providername',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.transportnumber',
                field: 'transportnumber',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicenumber',
                field: 'invoicenumber',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.sampleroutdate',
                field: 'sampleroutdate',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.sendernname',
                field: 'sendernname',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.stationname',
                field: 'stationname',
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.cropfullname',
                field: 'cropfullname',
                width: 120,
                hidden: false
            },
            {
                headerName: 'TABLE.gmopresence',
                field: 'gmopresence',
                width: 80,
                hidden: false
            },
            {
                headerName: 'TABLE.certificatenumber',
                field: 'certificatenumber',
                width: 85,
                hidden: false
            },
            {
                headerName: 'TABLE.certificatedate',
                field: 'certificatedate',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.snnumber',
                field: 'snnumber',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicegross',
                field: 'invoicegross',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicetare',
                field: 'invoicetare',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicenet',
                field: 'invoicenet',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.grosstime',
                field: 'grosstime',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                width: 110,
                hidden: false
            },
            {
                headerName: 'TABLE.taretime',
                field: 'taretime',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.gross',
                field: 'gross',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.tare',
                field: 'tare',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.net',
                field: 'net',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.grossdeficite',
                field: 'grossdeficite',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.netdeficite',
                field: 'netdeficite',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.scaletypename',
                field: 'scaletypename',
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                width: 200,
                hidden: false
            },
            {
                headerName: 'TABLE.permissiontime',
                field: 'permissiontime',
                width: 100,
                hidden: false,
            },
            {
                headerName: 'TABLE.permissionusername',
                field: 'permissionusername',
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.overtime',
                field: 'overtime',
                width: 120,
                hidden: false
            }
        ];
    }

    private createGridOptions(): void {
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.RailcarList,
            rowSelection: 'single',
            enableColResize: true,
            onGridReady: () => {
                // this.gridOptions.api.sizeColumnsToFit();
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            // getRowClass: (params: any) => {

            //     return (params.node.data.type === '0' )? 'accepted-employeer ' : 'accepted-traider ';
            // },
            suppressMovableColumns: true,

            //  enableSorting: true,
            //  enableFilter: true,
            headerHeight: 30

        };
    }
}
