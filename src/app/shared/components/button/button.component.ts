import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgClass, NgIf } from '@angular/common';
@Component({
    moduleId: module.id,
    selector: 'wblg-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    directives: [NgClass, NgIf]
})
export class ButtonComponent {
    @Input() icon: string;
    @Input() checable: boolean;

    @Input() value: boolean;
    @Output() valueChange = new EventEmitter();


    @Input() view: string[];
    @Input() translateText: string;
    @Input() text: string;

   // @Output() click = new EventEmitter();

    constructor() {
        this.icon = '';
        this.checable = false;
        this.view = ['light'];
        this.text = 'Default';
        //this.translateText = 'Default';
        
        this.value = false;
        
    }

    public clickedBtn(): void {
        if (this.checable) {
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
      //  this.click.emit('');
    }
}
