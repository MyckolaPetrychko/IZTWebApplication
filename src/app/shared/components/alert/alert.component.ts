import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
// import { TranslatePipe } from 'ng2-translate';


@Component({
    moduleId: module.id,
    selector: 'wblg-alert',
    templateUrl: 'alert.component.html',
    // styleUrls: ['alert.component.css'],
    directives: [NgClass, NgIf],
    // pipes: [TranslatePipe]
})

export class AlertComponent implements OnInit, OnChanges {
    @Input() set type(_type: string) {
        this.setType(_type);
    }

    @Input() time  : string | number;
    @Input() set message(_message: string) {
        this.setMess(_message);
    }
    @Input() set open(_visible: boolean) {
        this.visible = _visible || false;
        
        if (this.time > 0) {
            window.setTimeout(() => {
            this.close();
        }, +this.time * 1000);
        }
    }

    @Input('close') closeBtn: boolean;
    @Input() small : boolean = false;
    @Input() big: boolean = false;
    @Input() modal: boolean = false;

    @Output() openChange = new EventEmitter();

    private visible: boolean;

    private mess: string;
    private typeTitle: string;
    private iconClass: string;
    private typeClass: string;
    private timerClose : any;

    constructor() {
        this.visible = false;
        this.type = 'info';
        this.modal = false;
        this.timerClose = 0;
    }

    ngOnInit() {
        // console.log(this.type + ' ' + this.visible);
    }
    
    ngOnChanges(changes : { [prop:string] : SimpleChange }) {
         for (let propName in changes) {
             if ( propName === 'type') {
                 this.setType(changes[propName].currentValue);
             } else if ( propName === 'message') {
                 this.setMess(changes[propName].currentValue);
             }
            //  console.log(propName + ':' + changes[propName].currentValue);
        }
    }
    
    public close():void {
        // this.time = 5;
        this.visible = false;
        this.openChange.emit(false);
    }

    private setType(_type:string) {
        if (_type === 'info') {
            this.iconClass = 'fa-info';
            this.typeClass = 'alert-info-message';
            this.typeTitle = 'ALERT.INFO';
        } else if (_type === 'warn') {
            this.iconClass = 'fa-warning';
            this.typeClass = 'alert-warn-message';
            this.typeTitle = 'ALERT.WARNING';

        } else if (_type === 'error') {
            this.iconClass = 'fa-remove';
            this.typeClass = 'alert-error-message';
            this.typeTitle = 'ALERT.ERROR';

        } else {
            this.iconClass = 'fa-bug';
            this.typeClass = 'alert-bug-message';
            this.typeTitle = 'ALERT.BUG';
        }
    }

    private setMess(_mess : string) {
        if (this.big) {
            this.typeTitle = _mess;
        } else {
            this.mess = _mess;
        }
    }
}
