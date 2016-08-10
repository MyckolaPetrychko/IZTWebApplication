/**
 * @author Maryna Usatiuk 
 * @email maryna.duda@innovinnprom.com
 * @date 05.08.2016 09:50:59
 */

import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChange } from '@angular/core';

import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions, ColumnApi } from 'ag-grid/main';
import { Subscription } from 'rxjs/Subscription';

import { TranslatePipe, TranslateService, LangChangeEvent } from 'ng2-translate';
import { DatePipe } from '@angular/common';
import { RailcarService } from '../../railcars.service';

import { IRailcarDisparityModel } from './railcar-disparity.model';
import { AlertComponent } from '../../../shared/alert/alert.component';

/**
 * Component for disparitys for selected railcar
 * 
 * @export
 * @class RailcarDisparityComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {OnChanges}
 */
@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-disparity',
    templateUrl: './railcar-disparity.component.html',
    directives: [AgGridNg2, AlertComponent],
    pipes: [TranslatePipe]
})
export class RailcarDisparityComponent implements OnInit, OnDestroy, OnChanges {
   
    /**
     * List of disparity for current railcar
     * 
     * @type {IRailcarDisparityModel[]}
     */
    public DisparityList: IRailcarDisparityModel[];
    
    /**
     * Current railcar id
     * 
     * @type {number}
     */
    public railcarNumber: number;
    
    /**
     * Check is disparity exist
     * 
     * @private
     * @type {boolean}
     */
    private isNotNull: boolean;
   
    /**
     * Alert message 
     * 
     * @private
     * @type {string}
     */
    private message: string;
   
    /**
     * Type alert message
     * 
     * @private
     * @type {string}
     */
    private type: string;

    /**
     * Definitions of colunms for Ag2-Grid
     * 
     * @private
     * @type {*}
     */
    private columnDefs: any;
   
    /**
     * Gridoptions for Ag2-Grid
     * 
     * @private
     * @type {GridOptions}
     */
    private gridOptions: GridOptions;

    /**
     * subscription for change translate
     * 
     * @private
     * @type {Subscription}
     */
    private _subTranslate: Subscription;

    /**
     * Date pipe for render cell
     * 
     * @private
     * @type {DatePipe}
     */
    private _datePipe: DatePipe;

    /**
     * Creates an instance of RailcarDisparityComponent.
     * 
     * @param {RailcarService} _disparity - servise to get for https disparitys
     * @param {TranslateService} _translate - translate servise
     */
    constructor(private _disparity: RailcarService,
                private _translate: TranslateService) {
        this._datePipe = new DatePipe();
        this.isNotNull = false;

        this.message = 'TABLE.LOADING';
        this.DisparityList = [];
    }

    /**
     * Initial data
     * 
     */
    ngOnInit() {
        this.createColunmDef();
        this.createGridOptions();

        this._subTranslate = this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
            if (this.gridOptions && this.gridOptions.api) { this.gridOptions.api.refreshHeader(); }
        });
    }
    
    /**
     * Destroy data
     * 
     */
    ngOnDestroy() {
        this._subTranslate.unsubscribe();
    }

    /**
     * Check schanges of railcarId
     * 
     * @param {{
     *         [propName: string]: SimpleChange
     *     }} changes
     */
    ngOnChanges(changes: {
        [propName: string]: SimpleChange
    }) {
        for (let propName in changes) {
            this.railcarNumber = changes[propName].currentValue;
            if (this.gridOptions && this.gridOptions.api) {
                this.gridOptions.api.sizeColumnsToFit();
            }
            this.refreshData();
        }
    }

    /**
     * Set railcarNumber as railcarId 
     * 
     * @param {number} _val
     */
    @Input('railcarId') set(_val: number) {
        this.railcarNumber = _val;
    }

    /**
     * Check if exist railcarNumber and get data
     */
    public refreshData(): void {
        this.isNotNull = false;
        this.message = 'TABLE.LOADING';
        this.type = 'info';
        if (this.railcarNumber !== null && this.railcarNumber !== undefined) {
            this._disparity.getRailcarDisparityList('' + this.railcarNumber)
                .subscribe(res => {
                    this.DisparityList = res;
                    if (this.DisparityList.length > 0) {
                        this.isNotNull = true;
                    } else {
                        this.isNotNull = false;
                        this.message = 'TABLE.EMPTY';
                        this.type = 'info';
                    }
                },
                err => {
                    this.DisparityList = [];
                    this.isNotNull = false;
                    this.type = 'error';
                    this.message = 'Error:' + JSON.stringify(err);
                });

        } else {
            this.isNotNull = false;
            this.type = 'info';
            this.message = 'ERROR.NOT_SELECTED';
        }
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


    /**
     * Create column definitions
     * 
     * @private
     */
    private createColunmDef(): void {
        this.columnDefs = [
            {
                headerName: 'TABLE.deviationdescription',
                field: 'deviationdescription',
                cellClass: 'table-cell-left',
                width: 300,
                layoutInterval: 500
            },
            {
                headerName: 'TABLE.deviationtime',
                field: 'deviationtime',
                cellClass: 'table-cell-center',
                width: 200,
                cellRenderer: (params: any) => {
                    return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                },
                layoutInterval: 500
            },
            {
                headerName: 'TABLE.permission',
                
                layoutInterval: 500,
                children: [
                    {
                        headerName: 'TABLE.permissiontime',
                        field: 'permissiontime',
                        cellClass: 'table-cell-center',
                        width: 150,
                        cellRenderer: (params: any) => {
                            return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                    },
                    {
                        headerName: 'TABLE.permissionusername',
                        field: 'permissionusername',
                        cellClass: 'table-cell-left',
                        width: 200
                    }]
            },
            {
                headerName: 'TABLE.confirmation',
                layoutInterval: 500,
                children: [
                    {
                        headerName: 'TABLE.confirmationtime',
                        field: 'confirmationtime',
                        cellClass: 'table-cell-center',
                        width: 150,
                        cellRenderer: (params: any) => {
                            return this._datePipe.transform(params.value, 'dd.MM.yyyy HH:mm');
                        },
                    },
                    {
                        headerName: 'TABLE.confirmationusername',
                        field: 'confirmationusername',
                        cellClass: 'table-cell-left',
                        width: 200
                    }]
            }

        ];
    }

    /**
     * Creade gridoptions for ag-grid
     * 
     * @private
     */
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
            headerHeight: 30,
            rowHeight: 20,
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit();
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            suppressMovableColumns: true,
            suppressLoadingOverlay: true,
            suppressNoRowsOverlay: true
        };
    }
}
