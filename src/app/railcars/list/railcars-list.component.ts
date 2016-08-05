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
import { AlertComponent } from '../../shared/alert/alert.component';

import { TranslatePipe, TranslateService, LangChangeEvent } from 'ng2-translate';


import { IRailcarModel } from '../railcars.model';
import { RailcarService } from '../railcars.service';
import { RailcarProvide } from '../railcars.provide';

import { ComboboxComponent } from '../../shared/combobox/combobox.component';
import { LocalStorageService } from '../../shared/storage.service';
import { NotifyService } from '../../shared/notify.server';
import { DataFilterService } from '../../filters-data/filter-data.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-list',
    templateUrl: './railcars-list.component.html',
    styleUrls: ['./railcars-list.component.css'],
    directives: [NgIf, NgClass, ComboboxComponent, AgGridNg2, MyDatePicker, FORM_DIRECTIVES, AlertComponent],
    pipes: [TranslatePipe]
})
export class RailcarListComponent implements OnInit, OnDestroy, OnChanges {
    public RailcarList: IRailcarModel[];
    public selected: IRailcarModel;
    @Output('selectedItem') selectedItem: EventEmitter<IRailcarModel> = new EventEmitter();
    public isNotNull: boolean;

    @Input() filter: boolean;

    public message: string;

    @Input() refresh: number;
    @Output('refreshChange') refreshChanged: EventEmitter<{}> = new EventEmitter();


    private FiltersData: any;
    private columnDefs: any;
    private gridOptions: GridOptions;
    private dataSource: any;

    private visibleCols: any;
    private showalarmed: number; //TODO: ??? wtf???
    private shownotreceived: number; // only not received
    private showweighted: number; // зважені
    private showremoterecords: number;// повернені
    private showdeleted: number; // deleted


    private _datePipe: DatePipe;
    private dateStart: string;
    private dateEnd: string;

    private dateSt: number;
    private dateEn: number;
    private myDatePickerOptions: any;


    private _subscribeTranslate: any;
    private _notifyRefresh: any;


    constructor(private _railcar: RailcarService,
        private _filters: DataFilterService,
        private _storage: LocalStorageService,
        private _notify: NotifyService,
        private _translate: TranslateService
    ) {
        this._datePipe = new DatePipe();


        this.RailcarList = [];
        this.selected = {};

        this.message = 'LOADING.MESSAGE';


        // TODO: table
        this.FiltersData = [];
        this.gridOptions = <GridOptions>{};


    }

    ngOnInit() {

        this.changeViews();

        this.createColunmDef();
        this.createGridOptions();

        this.initFilters();
        this.initDatePicker();
        this.refreshData();

        this._subscribeTranslate =  this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
            if ( this.gridOptions && this.gridOptions.api) { this.gridOptions.api.refreshHeader(); }

            });
        
        this._notifyRefresh = this._notify.refreshAnnonced.subscribe(() => { this.setFilters(); } )

    }

    ngOnDestroy() {
       this._subscribeTranslate.unsubscribe();
       this._notifyRefresh.unsubscribe();
    }

    ngOnChanges(changes: {
        [propName: string]: SimpleChange
    }) {
        // for (let propName in changes) {

        //     console.warn(propName + ':' + changes[propName].currentValue);

        //     if (propName === 'refresh' && !changes[propName].isFirstChange()) {
        //         this.setFilters();
        //         this.refreshChanged.next(this.refresh);
        //     }
        // }
    }



    public log(data: any): void {
        console.log(data);
    }

    public refreshData(): void {
        this._railcar.getRailcarList(
            this.dateSt,
            this.dateEn,
            1,
            0,
            this.shownotreceived,
            this.showweighted,
            this.showremoterecords,
            this.showdeleted,
            this.FiltersData[0].value,
            this.FiltersData[1].value,
            this.FiltersData[2].value,
            this.FiltersData[4].value,
            this.FiltersData[3].value
        )
            .subscribe((res: any) => {

                this.RailcarList = res;
                this.isNotNull = (this.RailcarList.length > 0);
                this.message = (!this.isNotNull) ? 'NOROWS.MESSAGE' : '';
            },
            (err: any) => {
                this.RailcarList = [];
                this.message = 'Error get data:' + JSON.stringify(err);
            });
    }

    public setDateStart(data: any): void {
        this.dateSt = data.epoc;
    }
    public setDateEnd(data: any): void {
        this.dateEn = data.epoc;
    }

    private translateHeaderName(params: any): string {
        let translate: string = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe((val) => {
            translate = val;
        });
        return translate;
    }

    private setFilters(): void {
        this.refreshData();
        this.isNotNull = false;
        this.message = 'LOADING.MESSAGE';
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
        let _today = new Date();
        this.dateStart = this._datePipe.transform(_today, 'dd-MM-yyyy');
        this.dateEnd = this._datePipe.transform(_today, 'dd-MM-yyyy');

        this.dateEn = new Date(_today.getFullYear(),
            _today.getMonth(),
            _today.getDay(), 23, 59, 59, 0).getTime() / 1000.0;
        this.dateSt = new Date(_today.getFullYear(),
            _today.getMonth(),
            _today.getDay(), 0, 0, 0, 0).getTime() / 1000.0;
        // TODO: set as locale
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

    private changeViews(): void {
        let _strg = this._storage.getViewFromStorage();
        if (_strg) {
            // this.showalarmed = (_strg.showalarmed) ? 1 : 0;
            this.showdeleted = (_strg.showdeleted) ? 1 : 0;
            this.shownotreceived = (_strg.shownotreceived) ? 1 : 0;
            this.showremoterecords = (_strg.showremoterecords) ? 1 : 0;
            this.showweighted = (_strg.showweighted) ? 1 : 0;

            this.visibleCols = _strg.cols;
        }

        this.createColunmDef();
    }

    private createColunmDef(): void {

        this.columnDefs = [
            {
                headerName: 'TABLE.ownername',
                field: 'ownername',
                cellClass: 'table-cell-left',
                width: 200,
                hide: (this.visibleCols && !this.visibleCols.ownername)

            },
            {
                headerName: 'TABLE.providername',
                field: 'providername',
                cellClass: 'table-cell-left',
                width: 200,
                hide: (this.visibleCols && !this.visibleCols.providername)
            },
            {
                headerName: 'TABLE.transportnumber',
                field: 'transportnumber',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.transportnumber),
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
                hide: (this.visibleCols && !this.visibleCols.invoicenumber)

            },
            {
                headerName: 'TABLE.sampleroutdate',
                field: 'sampleroutdate',
                width: 120,
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                hide: (this.visibleCols && !this.visibleCols.sampleroutdate)

            },
            {
                headerName: 'TABLE.sendernname',
                field: 'sendernname',
                width: 200,
                cellClass: 'table-cell-left',
                hide: (this.visibleCols && !this.visibleCols.sendernname)

            },
            {
                headerName: 'TABLE.stationname',
                field: 'stationname',
                width: 200,
                cellClass: 'table-cell-left',
                hide: (this.visibleCols && !this.visibleCols.stationname)

            },
            {
                headerName: 'TABLE.cropfullname',
                field: 'cropfullname',
                cellClass: 'table-cell-left',
                width: 180,
                hide: (this.visibleCols && !this.visibleCols.cropfullname)
            },
            {
                headerName: 'TABLE.gmopresence',
                field: 'gmopresence',
                cellClass: 'table-cell-center',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.gmopresence),
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
                hide: (this.visibleCols && !this.visibleCols.certificatenumber)
            },
            {
                headerName: 'TABLE.certificatedate',
                field: 'certificatedate',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.certificatedate)
            },
            {
                headerName: 'TABLE.snnumber',
                field: 'snnumber',
                cellClass: 'table-cell-center',
                width: 130,
                hide: (this.visibleCols && !this.visibleCols.snnumber)
            },
            {
                headerName: 'TABLE.invoicegross',
                field: 'invoicegross',
                cellClass: 'table-cell-right',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.invoicegross)
            },
            {
                headerName: 'TABLE.invoicetare',
                field: 'invoicetare',
                cellClass: 'table-cell-right',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.invoicetare)
            },
            {
                headerName: 'TABLE.invoicenet',
                field: 'invoicenet',
                cellClass: 'table-cell-right',
                width: 100,
                hide: (this.visibleCols && !this.visibleCols.invoicenet)
            },
            {
                headerName: 'TABLE.grosstime',
                field: 'grosstime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.grosstime)
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.deviationtime)
            },
            {
                headerName: 'TABLE.taretime',
                field: 'taretime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.taretime)
            },
            {
                headerName: 'TABLE.gross',
                field: 'gross',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.gross)
            },
            {
                headerName: 'TABLE.tare',
                field: 'tare',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.tare)
            },
            {
                headerName: 'TABLE.net',
                field: 'net',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.net)
            },
            {
                headerName: 'TABLE.grossdeficite',
                field: 'grossdeficite',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.grossdeficite)
            },
            {
                headerName: 'TABLE.netdeficite',
                field: 'netdeficite',
                cellClass: 'table-cell-right',
                width: 120,
                hide: (this.visibleCols && !this.visibleCols.netdeficite)
            },
            {
                headerName: 'TABLE.scaletypename',
                field: 'scaletypename',
                cellClass: 'table-cell-center',
                width: 180,
                hide: (this.visibleCols && !this.visibleCols.scaletypename)
            },
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 250,
                hide: (this.visibleCols && !this.visibleCols.deviationdescription)
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
                        hide: (this.visibleCols && !this.visibleCols.permissiontime)
                    },
                    {
                        headerName: 'TABLE.permissionusername',
                        field: 'permissionusername',
                        cellClass: 'table-cell-left',

                        width: 200,
                        hide: (this.visibleCols && !this.visibleCols.permissionusername)
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
                hide: (this.visibleCols && !this.visibleCols.overtime)
            }
        ];
    }

    private createGridOptions(): void {
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.RailcarList,
            rowDeselection: true,
            rowSelection: 'single',
            enableColResize: true,
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
            headerHeight: 37.5,
            getRowClass: (params: any): string => {
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
            onRowSelected: (event: any): void => {
                console.log(event);
                this.selected = event.node.data;
                this.selectedItem.next(event.node.data);
            },

            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true
        };
    }
}
