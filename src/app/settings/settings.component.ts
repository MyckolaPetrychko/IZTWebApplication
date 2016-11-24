import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { IAuthUser } from '../shared/auth/auth-user.model';
import { GridOptions } from 'ag-grid/main';
import { UserService } from './userlist/user-list.service';
import { UserProvide } from './userlist/user-list.provide';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe, TranslateService, LangChangeEvent } from 'ng2-translate/ng2-translate';

import { DataFilterService } from '../railcars/common/services/filters-data/filter-data.service';
import { IDataModel } from '../railcars/common/services/filters-data/data.model';
import { USER_ROLES } from '../shared/auth/user-roles.model';

@Component({
    moduleId: module.id,
    selector: 'wblg-settings',
    templateUrl: './settings.component.html'
    // styleUrls: ['./userlist/user-list.component.css']
})
export class SettingsComponent implements OnInit, OnChanges {
    currentData: IAuthUser;
    selectedButton: string;
    isRowSelected: boolean;
    dataSelectedRow: IAuthUser;
    UserRoleList: string[];
    modal: boolean;
    public UsersList: IAuthUser[];
    private OwnersData: any;
    public message: string;
    private columnDefs: any;
    private gridOptions: GridOptions;
    private _subTranslate: Subscription;

    title_form: string;
    title_button: string;

    constructor(private userService: UserService, private _translate: TranslateService,
        private _filters: DataFilterService) {
        this.selectedButton = '';
        this.currentData = <IAuthUser>{};
        this.dataSelectedRow = <IAuthUser>{};
    }

    ngOnInit() {
        this.createColunmDef();
        this.createGridOptions();

        this.OwnersData = { value: '', label: 'LABEL.COMPANY', data: [] };

        this._filters.getOwnersList().subscribe(list => {
            this.OwnersData.data = list;
        });

        this.OwnersData.data = USER_ROLES['public'];

        this._subTranslate = this._translate.onLangChange.debounceTime(500).subscribe((event: LangChangeEvent) => {
            if (this.gridOptions && this.gridOptions.api) { this.gridOptions.api.refreshHeader(); }
        });

        if (this.checkCondition('add')) {
            this.currentData = <IAuthUser>{};
        }

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
            if (this.selectedButton === 'delete' && this.dataSelectedRow) {
                this.userService.deleteUser('' + this.dataSelectedRow.id);
                console.log("User " + this.dataSelectedRow.username + " was deleted!");
            }
        }
    }

    checkCondition(condition: string): boolean {
        if (condition === this.selectedButton) return true;
        else return false;
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
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.FIRST_NAME',
                field: 'firstName',
                width: 150,
                hidden: false
            },
            {
                headerName: 'LABEL.LAST_NAME',
                field: 'lastName',
                width: 150,
                hidden: false
            },
            {
                headerName: 'LABEL.MIDDLE_NAME',
                field: 'middleName',
                width: 150,
                hidden: false
            },
            {
                headerName: 'E-mail',
                field: 'email',
                width: 200,
                hidden: false
            },
            {
                headerName: 'LABEL.NUMBER_CLIENTS',
                field: 'clients',
                width: 200,
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
                this.gridOptions.api.sizeColumnsToFit();
            },
            forPrint: false,
            suppressHorizontalScroll: true,
            // getRowClass: (params: any) => {

            //     return (params.node.data.type === '0' )? 'accepted-employeer ' : 'accepted-traider ';
            // },
            suppressMovableColumns: true,

            enableSorting: true,
            //  enableFilter: true,
            headerHeight: 30,
        };
    }

    onRowClicked(event: any) {
        if (this.selectedButton === 'add')
            this.currentData = <IAuthUser>{};
        else    
        console.log(event.data);
        this.currentData = event.data;

        this.dataSelectedRow = event.data;
    }

    onRowDoubleClicked() {
        this.defineActiveButton('edit');
    }

    onFilterChanged(data: string) {
        this.gridOptions.api.setQuickFilter(data);
    }

    private translateHeaderName(params: any): string {
        let translate: string = params.colDef.headerName;
        this._translate.get(params.colDef.headerName).subscribe((val) => {
            translate = val;
        });
        return translate;
    }

    defineActiveButton(selectedObj: any) {
        switch (selectedObj) {
            case "add":
                this.currentData = <IAuthUser>{};
                this.title_form = 'TITLE.ADD_USER';
                this.title_button = 'BUTTON.ADD_USER';
                this.selectedButton = selectedObj;
                this.modal = true;
                break;
            case "edit":
                this.currentData = this.dataSelectedRow;
                this.title_form = 'TITLE.EDIT_USER';
                this.title_button = 'BUTTON.EDIT_USER';
                this.selectedButton = selectedObj;
                this.modal = true;
                break;
            case "delete":
                this.currentData = this.dataSelectedRow;
                this.title_form = 'TITLE.DELETE_USER';
                this.title_button = 'BUTTON.DELETE_USER';
                this.selectedButton = selectedObj;
                this.modal = true;
                break;
            default:
                this.selectedButton = '';
                this.title_form = '';
                break;
        }
    }

    ok() {
        if (this.selectedButton === 'add') {
            this.userService.addUser(this.currentData);
        }
        if (this.selectedButton === 'edit') {
            this.userService.updateUser(this.currentData);
        }
        if(this.selectedButton === 'delete') {
            this.userService.deleteUser(this.currentData.id.toString());
        }
        this.selectedButton = '';
        this.modal = false;
    }

    cancel() {
        this.selectedButton = '';
        this.modal = false;
    }
}