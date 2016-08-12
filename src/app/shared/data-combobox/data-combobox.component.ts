import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Provider, forwardRef } from '@angular/core';
import { NgIf, NgClass } from '@angular/common'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { DataFilterPipe } from '../../common/pipes/data-filter.pipe';
import { IDataModel } from '../../filters-data/data.model';
import { TranslatePipe } from 'ng2-translate';

const noop = () => {
    // noop
};

export const DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataComboboxComponent),
    multi: true
};

@Component({
    moduleId: module.id,
    selector: 'wblg-combobox-data',
    templateUrl: './data-combobox.component.html',
    directives: [NgIf, NgClass],
    pipes: [DataFilterPipe, TranslatePipe],
    providers: [DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR]
})

export class DataComboboxComponent implements ControlValueAccessor {

    @Input() dropdown: boolean = false;
    @Input('id') idName: string = 'comboboxID';

    @Input() prop: string = 'id';
    @Input() display: string = 'name';

    private selectProperty: string;
    private dataList: IDataModel[];
    private filterValue: string;
    private selectedValue: IDataModel = <IDataModel>{};
    private isOpenedMenu: boolean;

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.data = [];
    }

    @Input()
    set data(_d: IDataModel[]) {
        if (_d) {
        this.dataList = _d;

            if (this.selectProperty && this.selectProperty !== '') {
                for (var i = 0; i < this.dataList.length; i++) {
                    if (this.dataList[i][this.prop] === this.selectProperty) {
                        this.SelectElement(this.dataList[i]);
                        break;
                    }
                }
            }
        }
    }

    public SelectElement(elem: IDataModel): void {
        this.selectedValue = elem;
        if (!elem) {
            this.selectProperty = null;
            this.filterValue = null;
        } else {
            this.selectProperty = elem[this.prop];
            this.filterValue = elem[this.display];
        }
        this.ToogleMenu(false);
    }

    public ToogleMenu(state: boolean): void {
        if (state) {
            this.selectedValue = <IDataModel>{};
            this.filterValue = null;
        }
        if (this.dropdown) {
            this.isOpenedMenu = state;
        }

        if (this.selectedValue) {
            this.onChangeCallback(this.selectedValue[this.prop]);
        } else {
            this.onChangeCallback(null);
        }
    }

    public isActive(item: IDataModel): boolean {
        return (item.id === this.selectedValue.id);
    }

    // //get accessor
    // get value(): string | number {
    //     return this.selectedValue[this.prop];
    // };

    // //set accessor including call the onchange callback
    // set value(v: string | number) {
    //     for (var i = 0; i < this.data.length; i++) {
    //         if (this.data[i][this.prop] === v) {
    //             this.SelectElement(this.data[i]);
    //             break;
    //         }
    //     }
    // }


    //From ControlValueAccessor interface
    writeValue(value: string) {
        // console.log(value + ' first');
        if ((value !== undefined) && (value !== null)) {
            if (value !== this.selectedValue[this.prop]) {
                this.selectProperty = value;
                if (this.dataList.length > 0) {
                    for (var i = 0; i < this.dataList.length; i++) {
                        if (this.dataList[i][this.prop] === value) {
                            this.SelectElement(this.dataList[i]);
                            break;
                        }
                    }
                }
            }
        } else {
            this.SelectElement(<IDataModel>{});
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

