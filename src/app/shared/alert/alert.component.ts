import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { TranslatePipe } from 'ng2-translate';


@Component({
    moduleId: module.id,
    selector: 'wblg-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css'],
    directives: [NgClass, NgIf],
    pipes: [TranslatePipe]
})

export class AlertComponent implements OnInit {
    @Input() set type(_type: string) {
        if (_type === 'info') {
            this.iconClass = 'fa-info';
            this.typeClass = 'info-message';
            this.typeTitle = 'ALERT.INFO';
        } else if (_type === 'warn') {
            this.iconClass = 'fa-warning';
            this.typeClass = 'warning-message';
            this.typeTitle = 'ALERT.WARNING';

        } else if (_type === 'error') {
            this.iconClass = 'fa-remove';
            this.typeClass = 'error-message';
            this.typeTitle = 'ALERT.ERROR';

        } else {
            this.iconClass = 'fa-bug';
            this.typeClass = 'bug-message';
            this.typeTitle = 'ALERT.BUG';
        }
    }
    @Input() set message(_message: string) {
        this.mess = _message;
    }
    @Input() set open(_visible: boolean) {
        this.visible = _visible || false;
    }
    
    @Input() modal: boolean;

    @Output() openChange = new EventEmitter();
    @Output() OkPressed = new EventEmitter();
    @Output() CancelPressed = new EventEmitter();

    private visible: boolean;

    private mess: string;
    private typeTitle: string;
    private iconClass: string;
    private typeClass: string;

    constructor() {
        this.visible = false;
        this.type = 'info';
        this.modal = false;
    }

    ngOnInit() {
        console.log(this.type + ' ' + this.visible);


    }

    public ok(): void {
        this.OkPressed.emit('true');
        this.visible = false;
        this.openChange.emit(false);
    }

    public cancel(): void {
        this.CancelPressed.emit('true');
        this.visible = false;
        this.openChange.emit(false);
    }
}
