// TODO:FIX permissiontime or confirmtime??? as label of type disparity (deviations)

import {
    Component,
    OnInit,
    OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { GridOptions } from 'ag-grid/main';
import {
    TranslateService,
    LangChangeEvent
} from 'ng2-translate/ng2-translate';

import { DisparityService } from './disparity.service';
import { RefreshService } from '../common/services/refresh.service';

import { IDisparityModel } from './disparity.model';
import { UserService } from '../../shared/auth/user.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-disparity-list',
    templateUrl: 'disparity.component.html',
})

export class DisparityListComponent implements OnInit, OnDestroy {
    public DisparityList: IDisparityModel[];
    public total: number;
    public accepted: number;
    public isHidden: boolean;
    public selected: IDisparityModel;
    public isSelected: boolean;

    private isTraider: boolean;
    private isEmployyer: boolean;

    private modal: boolean;
    private isNotNull: boolean;
    private message: string;
    private type: string;

    private columnDefs: any;
    private gridOptions: GridOptions;

    private _subRefresh: Subscription;
    private _subTranslate: Subscription;

    private _datePipe: DatePipe;

    constructor(private _disparity: DisparityService,
        private _refresh: RefreshService,
        private _auth: UserService,
        private _translate: TranslateService) {
        this.DisparityList = [];
        this.selected = <IDisparityModel>{};
        this.total = 0;
        this.accepted = 0;

        this._datePipe = new DatePipe();
        this.isNotNull = false;
        this.isHidden = false;
        this.modal = false;
        this.message = 'TABLE.EMPTY';
        this.type = 'info';
        this.isSelected = false;
        this.isTraider = false;
        this.isEmployyer = false;

    }

    ngOnInit() {
        this.refreshData();
        this.createColunmDef();
        this.createGridOptions();

        this._subTranslate = this._translate.onLangChange
            .debounceTime(1000)
            .subscribe((event: LangChangeEvent) => {
                if (this.gridOptions && this.gridOptions.api) {
                    this.gridOptions.api.refreshHeader();
                }
            });

        this._subRefresh = this._refresh.refreshAnnonced.subscribe(() => {
            this.refreshData();
        });

        this.isEmployyer = this._auth.isAuth('employee');
        this.isTraider = this._auth.isAuth('trader');
    }

    ngOnDestroy() {
        this._subRefresh.unsubscribe();
        this._subTranslate.unsubscribe();
    }

    public refreshData(): void {
        this.isNotNull = false;
        this.message = 'MESSAGE.LOADING';
        this.type = 'info';
        this._disparity
            .getDisparityListCurrent()
            .subscribe(res => {
                this.DisparityList = res;
                this.total = this.DisparityList.length;
                this.accepted = 0;
                if (this.total > 0) {
                    this.isNotNull = true;
                    this.DisparityList.forEach(item => {
                        if (item.permissiontime === null) {
                            this.accepted++;
                        }
                    });
                } else {
                    this.isNotNull = false;
                    this.message = 'MESSAGE.EMPTY_TABLE';
                    this.type = 'info';
                }
            },
            err => {
                this.DisparityList = [];
                this.isNotNull = false;
                this.accepted = null;
                this.total = null;
                this.type = 'error';
                this.message = 'Error:' + JSON.stringify(err);
            });
    }

    public show(): void {
        this.isHidden = !this.isHidden;
    }

    public accept(): void {
        let railcarID: number = 0;
        let disparityID: number = 0;

        this._disparity
            .setDisparityRailcarAcceptApi(
            '' + railcarID,
            '' + disparityID
            ).subscribe((_val) => {
                this._refresh.refreshData();
            }, (err: string) => {
                this.DisparityList = [];
                this.isNotNull = false;
                this.accepted = null;
                this.total = null;
                this.type = 'error';
                this.message = err;
            });
    }

    private openModal(_val: boolean): void {
        this.modal = _val;
        console.log(_val);
        if (_val === false) { 
                  this.selected = <IDisparityModel>{};
                   this.gridOptions.api.deselectAll();
                   this.isSelected = false;
        }
    }

    private ok(): void {
        console.log('accepnt');
        this.accept();
        this.openModal(false);
    }

    private cancel(): void {
        this.openModal(false);
    }

    /**
     * Translate params.headerName  from Ag-Grid
     * 
     * @private
     * @param {*} params
     * @returns {string}
     */
    private translateHeaderName(params: any): string {
        let translate: string = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe((val) => {
            translate = val;
        });
        return translate;
    }

    private createColunmDef(): void {
        this.columnDefs = [
            {
                headerName: 'TABLE.ownername',
                field: 'ownername',
                cellClass: 'table-cell-left',
                width: 200,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.providername',
                field: 'providername',
                cellClass: 'table-cell-left',
                width: 200,
                layoutInterval: 600

            },
            {
                headerName: 'TABLE.transportnumber',
                field: 'transportnumber',
                cellClass: 'table-cell-right',
                width: 120,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.sampleroutdate',
                field: 'sampleroutdate',
                width: 120,
                cellClass: 'table-cell-center',
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy');
                },
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.stationname',
                field: 'stationname',
                width: 200,
                cellClass: 'table-cell-left',
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.cropfullname',
                field: 'cropfullname',
                cellClass: 'table-cell-left',
                width: 180,
                layoutInterval: 600

            },
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 300,
                layoutInterval: 600
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                width: 200,
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                layoutInterval: 600
            }
        ];
    }

    private createGridOptions(): void {
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.DisparityList,
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
            getRowClass: (params: any) => {
                return (params.node.data.permissiontime === null) ?
                    'table-to-confirm-traider ' : 'table-to-confirm-employeer ';
            },
            headerHeight: 30,
            rowHeight: 20,
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit();
            },
            onSelectionChanged: (): void => {
                let _sel: Array<IDisparityModel> = this.gridOptions.api.getSelectedRows();
                if ((_sel.length > 0) &&
                    (this.selected) &&
                    (this.selected.inventoryid === _sel[0].inventoryid)) {
                    // this.selected = <IDisparityModel>{};
                    // this.gridOptions.api.deselectAll();
                                    this.openModal(true);

                    // this.isSelected = false;
                } else {
                    this.selected = _sel[0];
                    this.isSelected = true;
                }
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true
        };
    }
}
