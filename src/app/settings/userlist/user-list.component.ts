import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';

import { ComboboxComponent } from '../../shared/input/input.component';
import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions } from 'ag-grid/main';
import { IAuthUser } from './user-list.model';
import { UserService } from './user-list.service';
import { UserProvide } from './user-list.provide';

import { UserDetailComponent } from './userDetail/userDetail.component';

import { DataFilterUserService } from './user-filter.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-userlist',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    directives: [ComboboxComponent, AgGridNg2, UserDetailComponent],
    providers: [DataFilterUserService, UserService]
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

    birthday: string;

    constructor(private userService: UserService, private _filters: DataFilterUserService) {
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

        this.refreshData();
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
                headerName: 'Login',
                field: 'login',
                width: 100,
                hidden: false
            },
            {
                headerName: 'Username',
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
                headerName: 'Company',
                field: 'company',
                width: 120,
                hidden: false
            },
            {
                headerName: 'Role',
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
}