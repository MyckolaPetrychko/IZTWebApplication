import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { FORM_DIRECTIVES } from '@angular/forms';
import { NgIf, NgClass, JsonPipe } from '@angular/common';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { Observable }                   from 'rxjs/Observable';
import { Subscription }                   from 'rxjs/Subscription';

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
    directives: [AlertComponent, FORM_DIRECTIVES, NgIf, NgClass]
})

export class RailcarFileUploadComponent implements OnInit, OnDestroy {
    public railcar: IRailcarModel;
    public id: string;
    public content: any;
    public fname: string;
    public url: SafeResourceUrl;
    //--> files name
    public isDisableTextContentEditor: boolean;
    public isVisibleElement: boolean;

    private message = 'MESS.LOADING';


    private _subscribeRouter: Subscription;


    constructor(private _router: ActivatedRoute,
        private _route: Router,
        private _railcar: RailcarService,
        private _sn: DomSanitizationService) {
        this.isVisibleElement = false;
        this.railcar = <IRailcarModel>{};

        this.isDisableTextContentEditor = true;
    }

    ngOnInit() {
        this._subscribeRouter = this._router.params.subscribe(params => {
            // TODO: subscribe
        });

    }

    ngOnDestroy() {
        this._subscribeRouter.unsubscribe();
    }

    public readNow(event: any): void {
        // var self = this;
        var file: File = event.target.files[0];
        this.fname = file.name;

        var myReader: FileReader = new FileReader();
        myReader.readAsText(file);

        myReader.onloadend = (e) => {
            this.content = myReader.result;
            this.save(this.content);
        };

    }

    public setDisableTextContentEditor(): void {
        this.isDisableTextContentEditor = !this.isDisableTextContentEditor;
    }

    public save(data: string): void {
        this.content = data;
        var blob = new Blob([this.content], { type: 'application/xml' });
        this.url = this._sn.bypassSecurityTrustUrl((window.URL.createObjectURL(blob)));
    }

    public load(): void {
        this._railcar.getRailcarFile(this.content).subscribe((data: any): void => {
            // todo: 
        });
    }


    private setNewLine(str: string): string {
        var pos = str.indexOf('><');
        while (pos !== -1) {
            str = str.substr(0, pos + 1) + '\n' + str.substr(pos + 1);
            pos = str.indexOf('><', pos + 2);
        }
        return str;
    }
}

