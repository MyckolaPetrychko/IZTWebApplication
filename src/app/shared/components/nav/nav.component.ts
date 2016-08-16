import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// import {  TranslatePipe } from 'ng2-translate';
import { AuthService } from '../../auth/auth.service';

import { WblgBtnActiveDirective } from '../button/button-active.directive';
@Component({
    moduleId: module.id,
    selector: 'wblg-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css'],
    // directives: [WblgBtnActiveDirective, ROUTER_DIRECTIVES],
    // pipes: [TranslatePipe]
})
export class NavComponent implements OnInit {
    public isAuth: boolean;
    
    private navlink: boolean[];
    constructor(private auth:AuthService) {
        this.isAuth = true;
        this.navlink = [];
     }

    ngOnInit() {
        this.isAuth = false;
        this.navlink = [true, false, false, false];
     }

     private isLogined() : boolean {
         // optimize;
         //this.auth.isLogined().subscribe((res) => { this.isAuth = res});
         return this.auth.isLogined();
     }
}
