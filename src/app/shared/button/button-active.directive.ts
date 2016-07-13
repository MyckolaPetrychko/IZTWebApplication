import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
@Directive({
    selector: '[wblgBtnActive]'
})
export class WblgBtnActiveDirective implements OnInit {
   
  
    private el: HTMLElement;
    private activity: boolean;
    private _defaultActiveClass: string;
    private _activeClass: string;
    private _unigue: any;

    @Input() set activeClass(_class: string) {
        this._activeClass = _class || this._defaultActiveClass;
    }
    @Input('wblgBtnActive') set active(_val : boolean) {
        this.activity = _val || false;
    }

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        this._defaultActiveClass = 'btn-active';
        this.activity = false;
    }

    ngOnInit() {
        this.changeActivityClass(this.activity);
    }

    @HostListener('click') onMouseClick() {
        this.activity = !this.activity;
        this.changeActivityClass(this.activity);
    }

    private changeActivityClass(_active: boolean) {
        if (_active) {
            this.el.classList.add(this._activeClass);
        } else {
           this.el.classList.remove(this._activeClass);
        }
    }
}

