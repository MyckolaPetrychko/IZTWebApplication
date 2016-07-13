import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common'
//import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ValueFilterPipe } from '../pipes/value-filter.pipe';

@Component({
    moduleId: module.id,
    selector: 'wblg-combobox',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.css'],
    directives: [ NgIf ],
    pipes: [ValueFilterPipe]
})


export class ComboboxComponent implements OnInit {
    @Input() data: string[] = [];

    @Input() label: string;
    @Input() value: string;
    @Output() valueChange = new EventEmitter();

    @Input() dropdown: boolean = false;

    private message: string;
    private isOpenedMenu: boolean;


    constructor(private _http: Http) {
        this.data = [];
      //  this.remote = false;
        this.message = '';
        console.log('Wblg-constrcuto');
    }

    ngOnInit() {
      /*  if (this.remote) {
            this._http.get(this.remoteUrl)
                .map(res => <string[]>res.json())
                // TODO: #debug | Combobox
                .do(data => {
                    console.debug('Input Dropdown ' +
                        '\nUrl: ' + this.remoteUrl +
                        '\nData: ' + JSON.stringify(data));
                })
                .subscribe(res => {
                    this.data = res;

                },
                err => {
                    this.data = ['No data fetched'];
                    this.message =  'No data fetched';
                });
        } */
    }

}

