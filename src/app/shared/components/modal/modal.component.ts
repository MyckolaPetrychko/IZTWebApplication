import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChange,
    ElementRef,
    Inject,
    HostListener,
    HostBinding
} from '@angular/core';



@Component({
    moduleId: module.id,
    selector: 'wblg-modal',
    templateUrl: 'modal.component.html',
    // styleUrls: ['modal.component.css'],
    // directives: [NgClass, NgIf],
    // pipes: [TranslatePipe],
    // host: {
    //     // '(blur)': 'close()',
    //     'tabindex': '-1'
    // }
})

export class ModalComponent implements OnInit {
    @Input() set type(_type: string) {
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
    @Input() set message(_message: string) {
        this.mess = _message;
    }
    @Input() set open(_visible: boolean) {
        // let el : HTMLElement = document.getElementById(this.id);
        this.visible = _visible || false;
        // if (this.visible) { this.elem.nativeElement.focus(); };
        // console.log(this.elem);
        //             console.log(this.id + 'id');

    }
    @Input() id: string = 'modalID';

    @Input() small: boolean;
    @Input() modal: boolean;
    @Input('close') closeBtn: boolean;

    @Input() set time(_t: number) {
        window.setTimeout(() => {
            this.open = false;
        }, _t * 1000);
    }

    @Output() openChange = new EventEmitter();
    @Output() OkPressed = new EventEmitter();
    @Output() CancelPressed = new EventEmitter();
    @HostBinding('tabindex') _tabIndex = -1;

    private visible: boolean;

    private mess: string;
    private typeTitle: string;
    private iconClass: string;
    private typeClass: string;

    constructor(private elem: ElementRef) {
        this.visible = false;
        this.type = 'info';
        this.modal = false;
        this.closeBtn = false;
    }
    // @HostListener('blur') onBlur() {
    //     this.close();
    // }
     public onClickmain() {
        this.close();
    }
     onKeyUp(event: KeyboardEvent) {
    //   if (event.keyCode === 27) {
    //     this.close();
    // }
    console.log(event);
    }

    ngOnInit() {
        // console.log(this.type + ' ' + this.visible);
    }

    ngOnChanges(changes: { [prop: string]: SimpleChange }) {
        for (let propName in changes) {
            // console.log(propName + ':' + changes[propName].currentValue);

        }
    }

    public ok(): void {
        console.log('modal ok');
        this.OkPressed.emit('true');
        this.visible = false;
        this.openChange.emit(false);
    }

    public cancel(): void {
        this.CancelPressed.emit('true');
        this.visible = false;
        this.openChange.emit(false);
    }

    public close(): void {
        this.visible = false;
        this.openChange.emit(false);
    }

    private onclickChild(event : MouseEvent): void {
        event.stopPropagation();
    }
}
