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
import { IRailcarEditModel } from './railcar-edit.model';

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
    public railcar: IRailcarEditModel;
    public id: string;


    private typeMode : string;

    private template: IRailcarEditModel;
    private useTemplate: boolean;

    private _senders: IDataModel[];
    private _owners: IDataModel[];
    private _providers: IDataModel[];
    private _srorages: IDataModel[];
    private _stations: IDataModel[];
    private _cultures: IDataModel[];
    private _classes: IDataModel[];
    private _sorts: IDataModel[];
    private _scales: IDataModel[];


    private message: string;
    private visibility: boolean;
    private type: string;
    private time: number;


    private _subscribeRouter: Subscription;


    constructor(private _router: ActivatedRoute,
        private _route: Router,
        private _railcars: RailcarService,
        private _filters: DataFilterService) {
        this.railcar = <IRailcarEditModel>{};
        this.template  = <IRailcarEditModel>{};

        this.visibility = false;
        this.useTemplate = false;

    }

    ngOnInit() {
        this._subscribeRouter = this._router.params.subscribe(params => {
            this.id = params['id'];
            if (this.id !== 'add') {
                 this.typeMode = 'EDIT';
                 this.useTemplate = false;

                    this.getRailcar(this.id);

            } else {
                 this.typeMode = 'ADD';
                 this.railcar = <IRailcarEditModel>{};
                this.useTemplate = true;
                  this.getRailcar('550205');

            }
        });
        this.loadDataForFilters();

    }

    ngOnDestroy() {
        this._subscribeRouter.unsubscribe();
    }


    private getRailcar(id:string) {
         this.setMessage('MESSAGE.LOADING', 5);
        this._railcars.getRailcarId(id).subscribe(
            (val: IRailcarEditModel) : void => {
                     if (!this.useTemplate) {
                         this.railcar = val;
                     } else {
                        this.template = val;
                     }
                }, (err: string) => {
                    this.setMessage(err, 0, 'error');
                });
            }

            private setTemplate(): void {
                this.railcar = this.template;
                console.log(this.template);
                let unprop : Array<string>;
                unprop = [ 'inventoryid', 
                'transportnumber',
                'sampleroutdate',
                'invoicenumber',
                'invoicedate',
                'invoicenet',
                'invoicegross',
                'invoicetare'];

                unprop.forEach((prop: string) : void => {
                    this.railcar[prop] = null;
                });
                                console.log(this.railcar);

            }

            private cancel() {
                if (this.typeMode === 'ADD') {
                    // TODO: 
                     this.railcar = <IRailcarEditModel> {};
                } else {
                    // TODO:
                    
                }
            }

    private  loadDataForFilters(): void {
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

    private setMessage(_mess: string, _time: number, _type: string = 'info'): void {
        this.message = _mess;
        this.time = _time;
        this.type = _type;
        this.visibility = true;
    }
}

