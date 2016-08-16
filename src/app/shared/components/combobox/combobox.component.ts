import { Component, OnInit, OnDestroy, Input, Output, EventEmitter,  Provider, forwardRef } from '@angular/core';
import { NgIf, NgClass } from '@angular/common'

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';

// import { ValueFilterPipe } from '../../common/pipes/value-filter.pipe';
// import { TranslatePipe } from 'ng2-translate';

const noop = () => {
    // console.log('noop');

};

export const COMBOBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ComboboxComponent),
    multi: true
};

@Component({
    moduleId: module.id,
    selector: 'wblg-combobox',
    templateUrl: './combobox.component.html',
    // styleUrls: ['./combobox.component.css'],
    // directives: [NgIf, NgClass],
    // pipes: [ValueFilterPipe, TranslatePipe],
    providers: [COMBOBOX_CONTROL_VALUE_ACCESSOR]
})


export class ComboboxComponent implements ControlValueAccessor {
    @Input() data: string[] = [];
    @Input() dropdown: boolean = false;
    @Input('id') idName: string = 'comboboxID';

    //The internal data model
    private innerValue: any = '';

    // private message: string;
    private isOpenedMenu: boolean;
    // private classSettingsObj: any;

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.data = [];
    }


    public SelectElement(elem: string): void {
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
        }
        

    }

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}

