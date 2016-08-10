import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { FORM_DIRECTIVES } from '@angular/forms';
import { NgIf, NgClass, JsonPipe } from '@angular/common';

import { Observable }                   from 'rxjs/Observable';
import { Subscription }                   from 'rxjs/Subscription';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/fromPromise';

import { TranslatePipe }  from 'ng2-translate';



import { RailcarService } from '../../railcars.service';
import { IRailcarModel } from '../../railcars.model';

import {IDataModel} from '../../../filters-data/data.model';
import { DataComboboxComponent } from '../.././../shared/data-combobox/data-combobox.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { MyDatePicker } from '../../../shared/my-date-picker/my-date-picker.component';

import { DataFilterService } from '../../../filters-data/filter-data.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-edit',
    templateUrl: 'railcar-edit.component.html',
    pipes: [TranslatePipe, JsonPipe],
    directives: [DataComboboxComponent, AlertComponent, FORM_DIRECTIVES, NgIf, NgClass, MyDatePicker]
})

export class RailcarEditComponent implements OnInit, OnDestroy {
    public railcar: IRailcarModel;
    public id: string;
    public isAddMode: boolean;


    //--> files name
    public isVisibleElement: boolean;
    private message = 'MESS.LOADING';



    private _senders: IDataModel[];
    private _owners: IDataModel[];
    private _providers: IDataModel[];

    private _srorages: IDataModel[];
    private _stations: IDataModel[];

    private _cultures: IDataModel[];
    private _classes: IDataModel[];
    private _sorts: IDataModel[];
    private _scales: IDataModel[];



    private _subscribeRouter: Subscription;


    constructor(private _router: ActivatedRoute,
        private _route: Router,
        private _railcars: RailcarService,
        private _filters: DataFilterService) {
        this.isVisibleElement = false;
        this.railcar = <IRailcarModel>{};

    }

    ngOnInit() {
        this._subscribeRouter = this._router.params.subscribe(params => {
            this.id = params['id'];
            this.isAddMode = true;

            if (this.id !== 'add') {
                this.isAddMode = false;
                this._railcars.getRailcarId(this.id).subscribe((val) => {
                    console.log(val);
                    this.railcar = val;
                }, (err: any) => {
                    this.message = err;
                })
            }
            this.isVisibleElement = true;
        });
        this.loadDataForFilters();



    }

    ngOnDestroy() {
        this._subscribeRouter.unsubscribe();
    }


    private loadDataForFilters(): void {
        this._filters.getCulturesList().subscribe((val: IDataModel[]): void => {
            this._cultures = <IDataModel[]>val;
        });
        this._filters.getCultureClassesList().subscribe((val: IDataModel[]): void => {
            this._classes = <IDataModel[]>val;
        });
        this._filters.getCultureSortesList().subscribe((val: IDataModel[]): void => {
            this._sorts = <IDataModel[]>val;
        });

        this._filters.getStationsList().subscribe((val: IDataModel[]): void => {
            this._stations = val;
        });
        this._filters.getScalesTypeList().subscribe((val: IDataModel[]): void => {
            this._scales = val;
        });
        this._filters.getStoragessList().subscribe((val: IDataModel[]): void => {
            this._srorages = val;
        });

        this._filters.getSendersList().subscribe((val: IDataModel[]): void => {
            this._senders = val;
        });
        this._filters.getOwnersList().subscribe((val: IDataModel[]): void => {
            this._owners = val;
        });
        this._filters.getProvidersList().subscribe((val: IDataModel[]): void => {
            this._providers = val;
        });

    }
}

