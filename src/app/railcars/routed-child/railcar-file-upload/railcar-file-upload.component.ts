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

import { AlertComponent } from '../../../shared/alert/alert.component';

import { DataFilterService } from '../../../filters-data/filter-data.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-file-upload',
    templateUrl: 'railcar-file-upload.component.html',
    pipes: [TranslatePipe],
    directives: [ AlertComponent, FORM_DIRECTIVES, NgIf, NgClass] 
})

export class RailcarFileUploadComponent implements OnInit, OnDestroy {
    public railcar: IRailcarModel;
    public id: string;
    public content : any;


    //--> files name
    public isDisableTextContentEditor: boolean;
    public isVisibleElement : boolean;




    private message = 'MESS.LOADING';


    private _subscribeRouter: Subscription;


    constructor(private _router: ActivatedRoute,
        private _route: Router,
        private _railcars: RailcarService) {
            this.isVisibleElement = false;
            this.railcar = <IRailcarModel>{};

            this.isDisableTextContentEditor = true;
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
 
    }

    ngOnDestroy() {
        this._subscribeRouter.unsubscribe();
    }

    public readNow(event : any): void {
        console.log(event.target.files[0]);
        let filename:File
            var self = this;
    var file:File = event.target.files[0];

    var myReader:FileReader = new FileReader();
    myReader.readAsText(file);

    myReader.onloadend = function(e) {
        self.content = myReader.result;
    };
        
    }



    public setDisableTextContentEditor() : void {
        this.isDisableTextContentEditor = !this.isDisableTextContentEditor;
    }

    public save():void {
        // TODO: save function
    }

    public load(): void {
        // TODO: load function
    }


}

