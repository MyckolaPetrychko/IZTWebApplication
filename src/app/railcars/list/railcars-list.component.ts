import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChange,
    EventEmitter,
    Input, Output }
from '@angular/core';

import {NgIf, NgClass, NgSwitch} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/common';
import { DatePipe } from '@angular/common';


import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions } from 'ag-grid/main';

import { MyDatePicker } from '../../shared/my-date-picker/index';
// import { AlertComponent } from '../../shared/alert/alert.component';

import { TranslatePipe, TranslateService } from 'ng2-translate';


import { IRailcarModel } from '../railcars.model';
import { RailcarService } from '../railcars.service';
import { RailcarProvide } from '../railcars.provide';

import { ComboboxComponent } from '../../shared/combobox/combobox.component';
import { DataFilterRailcarService } from '../railcars-filter.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-list',
    templateUrl: './railcars-list.component.html',
    styleUrls: ['./railcars-list.component.css'],
    directives: [NgIf, NgClass, ComboboxComponent, AgGridNg2, MyDatePicker, FORM_DIRECTIVES],
    pipes: [TranslatePipe],
    providers: [DataFilterRailcarService]
})
export class RailcarListComponent implements OnInit, OnDestroy, OnChanges {
    public RailcarList: IRailcarModel[];
    public selected: IRailcarModel;
    @Output() selectedItem = new EventEmitter();
    public isNotNull: boolean;

    @Input() filter: boolean;

    public message: string;

    @Input() refresh: boolean;
    public toRequestLast: number;
    private REFRESH_PERIOD: number;

    private timer: any;
    private intervalRefresh: any;

    private FiltersData: any;
    private columnDefs: any;
    private gridOptions: GridOptions;

    private _datePipe: DatePipe;
    private dateStart: string;
    private dateEnd: string;
    private myDatePickerOptions: any;


    private _infoTranslate: string;
    private _noRowsTranslate: string;
    private _loadingTranslate: string;

    constructor(private _railcar: RailcarService,
        private _filters: DataFilterRailcarService,
        private _translate: TranslateService
    ) {
        this._datePipe = new DatePipe();


        this.RailcarList = [];
        this.selected = {};

        this.message = 'Null';
        this.REFRESH_PERIOD = 30;
        this.toRequestLast = this.REFRESH_PERIOD;

        // TODO: table
        this.FiltersData = [];
        this.gridOptions = <GridOptions>{};

    }

    ngOnInit() {

        this.refreshData();
        this.setReshreshDataInterval(false);
        this.onResize();

        this.createColunmDef();
        this.createGridOptions();
        this.initFilters();
        this.initDatePicker();

        this._translate.get('ALERT.INFO').subscribe((val) => {
            // console.log('before');
            this._infoTranslate = val;
        });
        this._translate.get('TABLE.NO_ROWS').subscribe((val) => {
            // console.log('before');
            this._noRowsTranslate = val;
        });
        this._translate.get('TABLE.LOADING').subscribe((val) => {
            // console.log('before');
            this._loadingTranslate = val;
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
            console.warn(changes[propName] + ':' + propName);
            // if (!prop.isFirstChange()) {


            // }
        }
    }


    public log(data: any): void {
        console.log(data);
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
                this.isNotNull = (this.RailcarList.length > 0);
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

    private changeData(): void {
        console.log(this.FiltersData);
        console.log(this.dateEnd);
        console.log(this.dateStart);


    }


    private translateHeaderName(params: any): string {
        let translate: string = params.colDef.headerName;
        // console.log(params.colDef.headerName);

        this._translate.get(params.colDef.headerName).subscribe((val) => {
            // console.log('before');
            translate = val;
        });
        // console.log('after' + translate);

        return translate;
    }

    private setFilters(): void {
        console.log(this.FiltersData);

        // this.dateStart = new Date();
        // this.dateEnd = new Date();
        // this.FiltersData.forEach((item : any) => {
        //     item.value = '';
        // });
    }

    private initFilters(): void {
        this.FiltersData = [
            { value: '', label: 'TABLE.transportnumber', data: [], dropdown: false },
            { value: '', label: 'TABLE.invoicenumber', data: [], dropdown: false },
            { value: '', label: 'TABLE.sendernname', data: [], dropdown: true },
            { value: '', label: 'TABLE.cropfullname', data: [], dropdown: true },
            { value: '', label: 'TABLE.stationname', data: [], dropdown: true },
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

    private initDatePicker(): void {
        this.dateStart = this._datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.dateEnd = this._datePipe.transform(new Date(), 'dd-MM-yyyy');


        this.myDatePickerOptions = {
            todayBtnTxt: ' ‧ ',
            dateFormat: 'dd-mm-yyyy',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '20px',
            width: '200px',
            dayLabels: { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' },
            monthLabels: {
                1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May',
                6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
            }
        };
    }

    private createColunmDef(): void {
        this.columnDefs = [
            {
                headerName: 'TABLE.ownername',
                field: 'ownername',
                cellClass: 'table-cell-left',
                width: 200,
                hidden: false
            },
            {
                headerName: 'TABLE.providername',
                field: 'providername',
                cellClass: 'table-cell-left',
                width: 200,
                hidden: false

            },
            {
                headerName: 'TABLE.transportnumber',
                field: 'transportnumber',
                cellClass: 'table-cell-right',
                width: 120,
                hidden: false,
                cellRenderer: function (params: any) {      // Function cell renderer
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';
                    var icon = document.createElement('i');
                    icon.classList.add('table-cell-icon', 'fa');

                    if (params.data.state === 0) {
                        icon.classList.add('fa-train');
                    } else if (params.data.state === 1) {
                        icon.classList.add('fa-balance-scale');
                    } else if (params.data.state === 2) {
                        icon.classList.add('fa-map-signs');
                    } else if (params.data.state === 3) {
                        icon.classList.add('fa-trash');
                    } else if (params.data.state === 4) {
                        icon.classList.add('fa-road');
                    } else {
                        icon.classList.add('fa-bell');
                    }

                    element.appendChild(icon);
                    element.appendChild(document.createTextNode(params.value));
                    return element;
                }
            },
            {
                headerName: 'TABLE.invoicenumber',
                field: 'invoicenumber',
                width: 100,
                cellClass: 'table-cell-center',
                hidden: false
            },
            {
                headerName: 'TABLE.sampleroutdate',
                field: 'sampleroutdate',
                width: 120,
                cellClass: 'table-cell-center',

                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                hidden: false
            },
            {
                headerName: 'TABLE.sendernname',
                field: 'sendernname',
                width: 200,
                cellClass: 'table-cell-left',
                hidden: false
            },
            {
                headerName: 'TABLE.stationname',
                field: 'stationname',
                width: 200,
                cellClass: 'table-cell-left',

                hidden: false
            },
            {
                headerName: 'TABLE.cropfullname',
                field: 'cropfullname',
                cellClass: 'table-cell-left',

                width: 180,
                hidden: false
            },
            {
                headerName: 'TABLE.gmopresence',
                field: 'gmopresence',
                cellClass: 'table-cell-center',
                width: 100,
                hidden: false,
                cellRenderer: function (params: any) {      // Function cell renderer
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';

                    var icon = document.createElement('i');
                    // TODO: check values
                    if (params.data.gmopresence === 0) {
                        icon.classList.add('fa', 'fa-check-square-o');
                    } else {
                        icon.classList.add('fa', 'fa-square-o');
                    }
                    element.appendChild(icon);
                    return element;
                }

            },
            {
                headerName: 'TABLE.certificatenumber',
                field: 'certificatenumber',
                cellClass: 'table-cell-center',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.certificatedate',
                field: 'certificatedate',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.snnumber',
                field: 'snnumber',
                cellClass: 'table-cell-center',
                width: 130,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicegross',
                field: 'invoicegross',
                cellClass: 'table-cell-right',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicetare',
                field: 'invoicetare',
                cellClass: 'table-cell-right',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.invoicenet',
                field: 'invoicenet',
                cellClass: 'table-cell-right',
                width: 100,
                hidden: false
            },
            {
                headerName: 'TABLE.grosstime',
                field: 'grosstime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.taretime',
                field: 'taretime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hidden: false
            },
            {
                headerName: 'TABLE.gross',
                field: 'gross',
                cellClass: 'table-cell-right',
                width: 120,
                hidden: false
            },
            {
                headerName: 'TABLE.tare',
                field: 'tare',
                cellClass: 'table-cell-right',
                width: 120,
                hidden: false
            },
            {
                headerName: 'TABLE.net',
                field: 'net',
                cellClass: 'table-cell-right',
                width: 120,
                hidden: false
            },
            {
                headerName: 'TABLE.grossdeficite',
                field: 'grossdeficite',
                cellClass: 'table-cell-right',
                width: 120,
                hidden: false
            },
            {
                headerName: 'TABLE.netdeficite',
                field: 'netdeficite',
                cellClass: 'table-cell-right',
                width: 120,
                hidden: false
            },
            {
                headerName: 'TABLE.scaletypename',
                field: 'scaletypename',
                cellClass: 'table-cell-center',
                width: 180,
                hidden: false
            },
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 250,
                hidden: false
            },
            {
                headerName: 'TABLE.permission',
                cellClass: 'table-cell-center',
                children: [
                    {
                        headerName: 'TABLE.permissiontime',
                        field: 'permissiontime',
                        cellClass: 'table-cell-center',

                        cellRenderer: (params: any) => {
                            return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                        width: 150,
                        hidden: false
                    },
                    {
                        headerName: 'TABLE.permissionusername',
                        field: 'permissionusername',
                        cellClass: 'table-cell-left',

                        width: 200,
                        hidden: false
                    }]
            },
            {
                headerName: 'TABLE.overtime',
                field: 'overtime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'HH:mm');
                },
                width: 150,
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
            headerCellRenderer: (params: any) => {
                let txtGroup = document.getElementsByClassName('ag-header-group-text');
                for (let i = 0; i < txtGroup.length; i++) {
                    let element = txtGroup.item(i);
                    let text = element.textContent;
                    let txt = text;

                    this._translate.get(text).subscribe((val) => {
                        element.innerHTML = '';
                        element.appendChild(document.createTextNode(val));

                    });
                }
                return this.translateHeaderName(params);
            },
            suppressMovableColumns: true,
            headerHeight: 40,
            getRowClass: (params: any): string => {
                // console.log(params);
                var carloadClass = '';
                if (params.data.state === 0) {
                    carloadClass = 'grid-success';
                } else if (params.data.state === 1) {
                    carloadClass = 'grid-accepted';

                } else if (params.data.state === 2) {
                    carloadClass = 'grid-returned';

                } else if (params.data.state === 3) {
                    carloadClass = 'grid-deleted';
                } else if (params.data.state === 4) {
                    carloadClass = 'grid-routed';
                } else {
                    carloadClass = 'grid-alarmed';
                }

                return carloadClass;
            },
            overlayLoadingTemplate:
            `<div class="info-message">
                    <div class="title">
                        <span class="fa-stack" aria-hidden="true"> 
                         <i class="fa fa-circle fa-stack-2x"></i>
                         <i class="fa fa-info fa-stack-1x fa-inverse"></i>
                        </span> ${this._infoTranslate}
                    </div>
                 <div class="txt">
                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                         ${this._loadingTranslate}
                 </div>
                </div>`,
            overlayNoRowsTemplate: 
                `<div class="info-message">
                    <div class="title">
                        <span class="fa-stack" aria-hidden="true"> 
                         <i class="fa fa-circle fa-stack-2x"></i>
                         <i class="fa fa-info fa-stack-1x fa-inverse"></i>
                        </span> ${this._infoTranslate}
                    </div>
                 <div class="txt">
                         ${this._noRowsTranslate}
                 </div>
                </div>`


        };
    }
}
