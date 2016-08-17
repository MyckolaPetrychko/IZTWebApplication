import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChange,
    EventEmitter,
    Input, Output }
from '@angular/core';

// import { NgIf, NgClass, NgSwitch} from '@angular/common';
// import { FORM_DIRECTIVES} from '@angular/forms';
import { DatePipe } from '@angular/common';


// import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions } from 'ag-grid/main';
import { TranslatePipe, TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';


// import { MyDatePicker } from '../../../shared/my-date-picker/index';
// import { AlertComponent } from '../../../shared/alert/alert.component';



import { IRailcarModel } from './railcars-list.model';
import { RailcarService } from '../../common/services/railcars-http/railcars.service';

// import { DataComboboxComponent } from '../../../shared/data-combobox/data-combobox.component';
// import {InputComponent} from '../../../shared/input/input.component';
import { LocalStorageService } from '../../../shared/services/storage.service';
import { RefreshService as NotifyService } from '../../common/services/refresh.service';
import { SelectRailcarService } from '../../common/services/select-railcar.service';

import { DataFilterService } from '../../common/services/filters-data/filter-data.service';

import { RailcarDisparityComponent } from '../railcar-disparity/railcar-disparity.component';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-list',
    templateUrl: './railcar-list.component.html',
    // directives: [NgIf, NgClass,  AgGridNg2, 
    //     FORM_DIRECTIVES,  RailcarDisparityComponent],
    // pipes: [TranslatePipe]
})
export class RailcarListComponent implements OnInit, OnDestroy {
    public RailcarList: IRailcarModel[];
    public selected: IRailcarModel;
    public isNotNull: boolean;
    public isFullPage: boolean;

    @Input() set filter(_val: boolean) {
        if (!_val) {
            this.isFullPage = false;
        } else {
            this.isFullPage = true;
        }
    };

    public message: string;
    private FiltersData: any[];
    private columnDefs: any;
    private gridOptions: GridOptions;
    private dataSource: any;

    private visibleCols: any;
    // private showalarmed: number; //TODO: ??? wtf???
    private shownotreceived: number; // only not received
    private showweighted: number; // зважені
    private showremoterecords: number;// повернені
    private showdeleted: number; // deleted


    private _datePipe: DatePipe;
    private dateStart: Date;
    private dateEnd: Date;


    private _subscribeTranslate: any;
    private _notifyRefresh: any;
    private isFirstSelection: boolean;


    constructor(private _railcar: RailcarService,
        private _filters: DataFilterService,
        private _storage: LocalStorageService,
        private _notify: NotifyService,
        private _select: SelectRailcarService,
        private _translate: TranslateService
    ) {
        this._datePipe = new DatePipe();


        this.RailcarList = [];
        this.selected = <IRailcarModel>{};
        this.isFullPage = true;
        this.message = 'LOADING.MESSAGE';
        this.isFirstSelection = false;

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

        this._subscribeTranslate = this._translate.onLangChange
        .debounceTime(1000)
        .subscribe((event: LangChangeEvent) => {
            if (this.gridOptions && this.gridOptions.api) { this.gridOptions.api.refreshHeader(); }

        });

        this._notifyRefresh = this._notify.refreshAnnonced.subscribe(() => { 
            console.log ('refresh ff'); this.setFilters(); })

    }

    ngOnDestroy() {
        this._subscribeTranslate.unsubscribe();
        this._notifyRefresh.unsubscribe();
    }


    public log(data: any): void {
        console.log(data);
    }

    public refreshData(): void {
                 console.log('Refresh ' + new Date);
                 console.log('Refresh\t' + this.selected.inventoryid 
                 + '\n\t\t'+ this._select.selectedRailcar().inventoryid);

       
                if (this._select.isSelectedRailcar()) {
                   this.selected = this._select.selectedRailcar();
                } else {
                    this.selected = <IRailcarModel>{};
                }

        // this.selected = <IRailcarModel>{};
        this._railcar.getRailcarList(
            this.dateStart.getTime(),
            this.dateEnd.getTime(),
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
            .subscribe((res: IRailcarModel[]): void => {

                this.RailcarList = res;
                this.isNotNull = (this.RailcarList.length > 0);
                this.message = (!this.isNotNull) ? 'NOROWS.MESSAGE' : '';
                 if (this.gridOptions && this.gridOptions.api && this.selected && this.selected.inventoryid ) {
                      this.selectData(this.selected);
                 }

            },
            (err: string): void => {
                this.RailcarList = [];
                this.message = 'Error get data:' + JSON.stringify(err);
            });
    }

    private translateHeaderName(params: any): string {
        let translate: string = params.colDef.headerName;
        let txtGroup = document.getElementsByClassName('ag-header-cell-text');
        this._translate.get(params.colDef.headerName).subscribe((val) => {
            translate = val;
        });
        return translate;
    }

    private setFilters(): void {
        this.refreshData();
        this.isNotNull = false;
        this.message = 'MESSAGE.LOADING';
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
        this.dateEnd = new Date(_today.getFullYear(),
            _today.getMonth(),
            _today.getDate(), 23, 59, 59, 999),
            this.dateStart = new Date(_today.getFullYear(),
                _today.getMonth(),
                _today.getDate(), 0, 0, 0, 0);
    }

    private changeViews(): void {
        let _strg = this._storage.getViewFromStorage();
        if (_strg) {
            this.showdeleted = (_strg.showdeleted) ? 1 : 0;
            this.shownotreceived = (_strg.shownotreceived) ? 1 : 0; // не прийняті
            this.showremoterecords = (_strg.showremoterecords) ? 1 : 0; // 
            this.showweighted = (_strg.showweighted) ? 1 : 0; // зважені по нетто

            this.visibleCols = _strg.cols;
        }

        this.createColunmDef();
    }

    private createColunmDef(): void {
        // TODO: add movable and save in local position
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
                headerName: 'TABLE.regdate',
                field: 'regdate',
                width: 120,
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                hide: (this.visibleCols && !this.visibleCols.regdate)
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
                cellRenderer: function (params: any) {      // Function cell renderer
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';

                    if (params.value !== null) {

                        var icon = document.createElement('i');
                        icon.classList.add('table-cell-icon', 'fa');

                        if (params.data.certificatepresence === '+') {
                            icon.classList.add('fa-check-square-o');
                        } else {
                            icon.classList.add('fa-square-o');
                        }

                        element.appendChild(icon);
                        element.appendChild(document.createTextNode(params.value));

                    }
                    return element;
                },
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
                cellRenderer: function (params: any) {      // Function cell renderer
                    var element = document.createElement('span');
                    element.style.display = 'inline-block';

                    if (params.value !== null) {
                        var icon = document.createElement('i');
                        icon.classList.add('table-cell-icon', 'fa');

                        if (params.data.snpresence === '+') {
                            icon.classList.add('fa-check-square-o');
                        } else {
                            icon.classList.add('fa-square-o');
                        }

                        element.appendChild(icon);
                        element.appendChild(document.createTextNode(params.value));

                    }
                    return element;
                },
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
                        headerName: 'TABLE.permissiondescription',
                        field: 'permissiondescription',
                        cellClass: 'table-cell-left',
                        width: 200,
                        hide: (this.visibleCols && !this.visibleCols.permissiondescription)
                    },
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
                headerName: 'TABLE.confirmation',
                cellClass: 'table-cell-center',
                children: [
                    {
                        headerName: 'TABLE.confirmationtime',
                        field: 'confirmationtime',
                        cellClass: 'table-cell-center',

                        cellRenderer: (params: any) => {
                            return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                        width: 150,
                        hide: (this.visibleCols && !this.visibleCols.confirmationtime)
                    },
                    {
                        headerName: 'TABLE.confirmationusername',
                        field: 'confirmationusername',
                        cellClass: 'table-cell-left',
                        width: 200,
                        hide: (this.visibleCols && !this.visibleCols.confirmationusername)
                    }
                ]
            },
            { // TODO: Bookmark | waiting time check
                headerName: 'TABLE.waitingtime',
                field: 'waitingtime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    // TODO: cannont create a pipe DateDefPipe:[format]
                    let hrs: number = Math.floor(params.value / 60 / 60 / 1000);
                    let def: number = params.value - hrs * 60 * 60 * 1000;
                    let min: number = Math.floor(def / 60 / 1000);
                    let hrsSt = (hrs > 10) ? '' + hrs : '0' + hrs;
                    let minSt = (min > 10) ? '' + min : '0' + min;
                    return hrsSt + ':' + minSt;
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.waitingtime)
            },
            {
                headerName: 'TABLE.overtime',
                field: 'overtime',
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    let hrs: number = Math.floor(params.value / 60 / 60 / 1000);
                    let def: number = params.value - hrs * 60 * 60 * 1000;
                    let min: number = Math.floor(def / 60 / 1000);
                    let hrsSt = (hrs > 10) ? '' + hrs : '0' + hrs;
                    let minSt = (min > 10) ? '' + min : '0' + min;
                    return hrsSt + ':' + minSt;
                },
                width: 150,
                hide: (this.visibleCols && !this.visibleCols.overtime)
            },
            {
                headerName: 'TABLE.remark',
                field: 'remark',
                cellClass: 'table-cell-left',
                width: 250,
                hide: (this.visibleCols && !this.visibleCols.remark)
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
            headerHeight: 30,
            rowHeight: 20,

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
            onSelectionChanged: (): void => {
                    console.log(!this.isFirstSelection + ' ' + this.isFirstSelection);

                if (!this.isFirstSelection) {
                    let _sel: Array<IRailcarModel> = this.gridOptions.api.getSelectedRows();
                    if ((_sel.length > 0) && (this.selected) && (this.selected.inventoryid === _sel[0].inventoryid)) {
                        this.selected = <IRailcarModel>{};
                        this.gridOptions.api.deselectAll();
                    } else {
                        this.selected = _sel[0];
                    }
                                        console.log('select');

                    this._select.selectRailcar(this.selected);
                                        // this.selectedItem.next(event.node.data);
                } else {
                    // this.selected = this.gridOptions.api.getSelectedRows()[0];
                                                            console.log('first select');

                    this.isFirstSelection = false;
                }
            },
            onGridReady: () => {
                // console.log(this._select.isSelectedRailcar());
        
                // if (this._select.isSelectedRailcar()) {
                //                     this.selected = this._select.selectedRailcar();

                //     this.selectData(this._select.selectedRailcar());

                // } else {
                //     console.log('none');
                // }

            },
            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true

        };
    }

    private selectData(_selected: IRailcarModel): void {
        console.log('_selected');
        console.log(_selected);
        this.isFirstSelection = true;
        if (_selected && _selected.inventoryid) {

            this.gridOptions.api.forEachNode((_node) => {

                if (_node.data.inventoryid === _selected.inventoryid) {
                    _node.setSelected(true, true);
                }
            });
        }
    }
}
