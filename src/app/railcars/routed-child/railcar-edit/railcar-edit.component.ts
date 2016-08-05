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

import { ComboboxComponent } from '../.././../shared/combobox/combobox.component';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { MyDatePicker } from '../../../shared/my-date-picker/my-date-picker.component';

import { DataFilterService } from '../../../filters-data/filter-data.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-edit',
    templateUrl: 'railcar-edit.component.html',
    pipes: [TranslatePipe, JsonPipe],
    directives: [ComboboxComponent, AlertComponent, FORM_DIRECTIVES, NgIf, NgClass, MyDatePicker] 
})

export class RailcarEditComponent implements OnInit, OnDestroy {
    public railcar: IRailcarModel;
    public id: string;


    //--> files name

    public isVisibleElement : boolean;




    private message = 'MESS.LOADING';



    private _senders : any;
    private _owners: any;
    private _providers: any;

    private _srorages: any;
    private _stations: any;
   
    private _cultures: any;
    private _classes: any;
    private _sorts: any;
    private _scales: any;



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
            if (this.id) {
            this._railcars.getRailcarId(this.id).subscribe((val) => {
                this.railcar = val;
            }, (err: any) => {
                this.message = err;
            })
            }
                this.isVisibleElement = true;
        });

        this._filters.getCulturesList().subscribe((val) => {
            this._cultures = val;
            this._classes = val;
            this._sorts =val;

        });

        this._filters.getStationsList().subscribe((val) => {
            console.log(val);
            
            this._stations = val;
        });

        this._filters.getSendersList().subscribe((val)=> {
            this._senders = val;
            this._owners = val;
            this._providers = val;
            this._srorages = val;
        });

        this._filters.getCulturesList().subscribe((val) => {
            this._srorages = ['storage 1', 'storage default'];
            this._scales = ['scale 1', 'scale default'];
        });
    
    }

    ngOnDestroy() {
        this._subscribeRouter.unsubscribe();
    }


    public setDateEpoch( data: any, value: string) : void {
        this.railcar[value] = data.epoc;
    }

}

