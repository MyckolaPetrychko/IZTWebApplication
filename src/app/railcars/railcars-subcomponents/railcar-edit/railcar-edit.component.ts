import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { FORM_DIRECTIVES } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

import { Observable }                   from 'rxjs/Observable';
import { Subscription }                   from 'rxjs/Subscription';

import { TranslatePipe }  from 'ng2-translate/ng2-translate';
import { RailcarService } from '../../common/services/railcars-http/railcars.service';
import { IRailcarEditModel } from './railcar-edit.model';

import {IDataModel} from '../../common/services/filters-data/data.model';
// import { DataComboboxComponent } from '../.././../shared/data-combobox/data-combobox.component';
// import { AlertComponent } from '../../../shared/alert/alert.component';
// import { MyDatePicker } from '../../../shared/my-date-picker/my-date-picker.component';

import { DataFilterService } from '../../common/services/filters-data/filter-data.service';
// import { RailcarNumberValidator} from '../../../common/directives/railcar-number.validator';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-edit',
    templateUrl: 'railcar-edit.component.html',
    // pipes: [TranslatePipe],
    // directives: [DataComboboxComponent, AlertComponent, FORM_DIRECTIVES,  MyDatePicker, RailcarNumberValidator]
})
export class RailcarEditComponent implements OnInit, OnDestroy {
    public railcar: IRailcarEditModel;
    public id: string;

    private typeMode: string;
    private cancelName: string;

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
    private disableForm: boolean;


    private _subscribeRouter: Subscription;


    constructor(private _router: ActivatedRoute,
        private _route: Router,
        private _railcars: RailcarService,
        private _filters: DataFilterService) {
        this.railcar = <IRailcarEditModel>{};
        this.template = <IRailcarEditModel>{};

        this.visibility = false;
        this.useTemplate = false;
        this.disableForm = false;
    }

    ngOnInit() {
        this._subscribeRouter = this._router.params.subscribe(params => {
            this.id = params['id'];
            this.disableForm = false;
            let template = params['template'];

            if (this.id !== 'add') {
                this.typeMode = 'EDIT';
                this.cancelName = 'CANCEL';
                this.useTemplate = false;
                this.getRailcar(this.id);
            } else {
                this.useTemplate = true;
                this.typeMode = 'ADD';
                this.cancelName = 'RESET';
                this.railcar = <IRailcarEditModel>{};
                if (template) {
                    this.getRailcar(template);
                } else {
                    this.useTemplate = false;
                }
            }
        });
        this.loadDataForFilters();

    }

    ngOnDestroy() {
        this._subscribeRouter.unsubscribe();
    }

    public save(): void {
        if (this.typeMode === 'ADD') {
            this._railcars.addRailcar(this.railcar).subscribe((val: IRailcarEditModel): void => {
                this.setMessage('MESSAGE.RAILCAR.SUCCESS_ADDET', 5, 'info');
            }, (err: string): void => {
                this.setMessage(err, 0, 'error');

            });
        } else {
            this._railcars.updateRailcar(this.railcar).subscribe((val: IRailcarEditModel): void => {
                this.setMessage('MESSAGE.RAILCAR.SUCCESS_EDIT', 5, 'info');
            }, (err: string): void => {
                this.setMessage(err, 0, 'error');

            });
        }
    }

    private getRailcar(id: string) {
        this.setMessage('MESSAGE.LOADING', 2);
        this._railcars.getRailcarId(id).subscribe(
            (val: IRailcarEditModel): void => {
                if (!this.useTemplate) {
                    this.railcar = val;
                    // TOD0: Bookmark state check; 
                    this.disableForm = (val.state < 0);
                } else {
                    this.template = val;
                }
            }, (err: string) => {
                this.setMessage(err, 0, 'error');
            });
    }

    private setTemplate(): void {
        if (this.template) {
            this.railcar = this.template;
            console.log(this.template);
            let unprop: Array<string>;
            unprop = ['inventoryid',
                'transportnumber',
                'sampleroutdate',
                'invoicenumber',
                'invoicedate',
                'invoicenet',
                'invoicegross',
                'invoicetare'];
            unprop.forEach((prop: string): void => {
                this.railcar[prop] = null;
            });
            console.log(this.railcar);
        } else {
            this.setMessage('MESSAGE.TEMPLATE_NOT_SET', 5, 'warn');
        }
    }

    private cancel() {
        if (this.typeMode === 'ADD') {
            this.railcar = <IRailcarEditModel>{};
        } else {
            // TODO: back or list
            this._route.navigate(['/railcars', { id: this.id }]);
        }
    }

    private loadDataForFilters(): void {
        this._filters.getCulturesList().subscribe((val: IDataModel[]): void => {
            this._cultures = <IDataModel[]>val;
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

    private setGrossWeight() {
        let sum: number = 0;
        if (!!this.railcar.invoicenet) {
            sum += +this.railcar.invoicenet;
        }
        if (!!this.railcar.invoicetare) {
            sum += +this.railcar.invoicetare;
        }
        this.railcar.invoicegross = sum;
    }

    private setMessage(_mess: string, _time: number, _type: string = 'info'): void {
        this.message = _mess;
        this.time = _time;
        this.type = _type;
        this.visibility = true;
    }

    private changeCulture(): void {
        if (
            this.railcar
            && '' + this.railcar.cropid
            && this.railcar.cropid !== null
            && this.railcar.cropid !== undefined) {
            this._filters.getCultureClassesList(this.railcar.cropid).subscribe((val: IDataModel[]): void => {
                this._classes = <IDataModel[]>val;
            });
            this._filters.getCultureSortesList(this.railcar.cropid).subscribe((val: IDataModel[]): void => {
                this._sorts = <IDataModel[]>val;
            });
        } else {
            this._classes = [];
            this._sorts = [];
        }
    }
}

