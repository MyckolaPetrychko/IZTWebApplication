import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';

// import { ComboboxComponent } from '../../shared/combobox/combobox.component';
import { GridOptions } from 'ag-grid/main';
import { IAuthUser } from './user-list.model';
import { UserService } from './user-list.service';
import { UserProvide } from './user-list.provide';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe, TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';

import { UserDetailComponent } from './userDetail/userDetail.component';

import { DataFilterUserService } from './user-filter.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-userlist',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    // directives: [AgGridNg2, UserDetailComponent],
    // providers: [DataFilterUserService, UserService],
    // pipes: [TranslatePipe]
})

export class DropDownListComponent implements OnInit, OnChanges {
    @Input() selectedButton: string;
    @Output() selectedButtonChange = new EventEmitter();
    isRowSelected: boolean;
    currentData: IAuthUser;
    dataSelectedRow: IAuthUser;
    public UsersList: IAuthUser[];
    private FiltersData: any;
    public message: string;
    private columnDefs: any;
    private gridOptions: GridOptions;
    private _subTranslate: Subscription;

    birthday: string;

    constructor(private userService: UserService, private _filters: DataFilterUserService, private _translate: TranslateService) {
        this.selectedButton = '';
        this.UsersList = [];
        this.message = 'Null';
        this.FiltersData = [];
        this.gridOptions = <GridOptions>{};
        this.currentData = <IAuthUser>{};
        this.birthday = "2000-01-01";
    }

    ngOnInit() {
        this.createColunmDef();
        this.createGridOptions();

        this.FiltersData = [
            { value: '', label: 'Name', data: [], dropdown: false },
            { value: '', label: 'Company', data: [], dropdown: false },
            { value: '', label: 'Group', data: [], dropdown: true }
        ];

        this._filters.getCompaniesList().subscribe(list => {
            this.FiltersData[2].data = list;
        });

        this._subTranslate = this._translate.onLangChange.debounceTime(500).subscribe((event: LangChangeEvent) => {
            if (this.gridOptions && this.gridOptions.api) { this.gridOptions.api.refreshHeader(); }
        });

        this.refreshData();
    }

    ngOnDestroy() {
        this._subTranslate.unsubscribe();
    }

    ngOnChanges() {
        if (this.selectedButton === 'add')
            this.currentData = <IAuthUser>{};
        else {
            if (this.dataSelectedRow)
                this.currentData = this.dataSelectedRow;
            if(this.selectedButton === 'delete' && this.dataSelectedRow) {
                this.userService.deleteUser(this.dataSelectedRow.id);
                console.log("User " + this.dataSelectedRow.login + " was deleted!"); 
            }
        }
    }

    public refreshData(): void {
        this.userService.getUserList()
            .subscribe(res => {
                this.UsersList = res;

            },
            err => {
                this.UsersList = [];
                this.message = 'Error get data:' + JSON.stringify(err);
            });
    }

    private createColunmDef(): void {
        this.columnDefs = [
            {
                headerName: 'LABEL.LOGIN',
                field: 'login',
                width: 100,
                hidden: false
            },
            {
                headerName: 'LABEL.USERNAME',
                field: 'username',
                width: 100,
                hidden: false
            },
            {
                headerName: 'E-mail',
                field: 'email',
                width: 100,
                hidden: false
            },
            {
                headerName: 'LABEL.COMPANY',
                field: 'company',
                width: 120,
                hidden: false
            },
            {
                headerName: 'LABEL.ROLE',
                field: 'role',
                width: 120,
                hidden: false
            }
        ];
    }

    private createGridOptions(): void {
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.UsersList,
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
            onGridReady: () => {
                // this.gridOptions.api.sizeColumnsToFit();
            },
            // forPrint: false,
            // suppressHorizontalScroll: true,
            // getRowClass: (params: any) => {

            //     return (params.node.data.type === '0' )? 'accepted-employeer ' : 'accepted-traider ';
            // },
            suppressMovableColumns: true,

            //  enableSorting: true,
            //  enableFilter: true,
            headerHeight: 30,
        };
    }

    onCellClicked(event: any) {
        if (this.selectedButton === 'add')
            this.currentData = <IAuthUser>{};
        else
            this.currentData = event.data;

        this.dataSelectedRow = event.data;
    }

    hideForm() {
        this.selectedButtonChange.emit('');
    }

    private translateHeaderName(params: any): string {
        let translate: string = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe((val) => {
            translate = val;
        });
        return translate;
    }
}