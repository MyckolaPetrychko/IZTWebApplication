import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common'
//import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ValueFilterPipe } from '../pipes/value-filter.pipe';

@Component({
    moduleId: module.id,
    selector: 'wblg-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.css'],
    directives: [NgIf, NgClass],
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
    private classSettingsObj: any;

    constructor(private _http: Http) {
        this.data = [];
        //  this.remote = false;
        this.message = '';
        // console.log('Wblg-constrcuto');


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

    public SelectElement(elem: string): void {
        // console.log(elem);
        // console.log(elem === 'No data present');

        this.value = elem;

        if (elem === 'No data present') {
            this.value = '';
        }
        this.ToogleMenu(false);
        
    }

    public ToogleMenu(state: boolean): void {
        if (state) { this.value = ''; }

        if (this.dropdown) {
            this.isOpenedMenu = state;
            this.setValue(this.value);
        }
        

    }

    
    public setValue(_val :string) : void {
        console.log(_val);
        this.valueChange.emit(_val);
    }
}

