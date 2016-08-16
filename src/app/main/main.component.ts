// import {HTTP_PROVIDERS, Http } from '@angular/http';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {TranslateService} from 'ng2-translate/ng2-translate';


// import { LocalStorageService } from '../common/servises/storage.service';
// import { NotifyService } from '../common/servises/notify.server';




// import { RailcarsComponent } from '../railcars/railcar-main-page/railcars.component';
// import { DataFilterService } from '../filters-data/filter-data.service';
// import { RailcarProvide } from '../railcars/railcars.provide';


@Component({
    moduleId: module.id,
    selector: 'wblg-main',
    templateUrl: 'main.component.html',
    // providers: [

    //     {
    //         provide: TranslateLoader,
    //         useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    //         deps: [Http]
    //     },
    //     // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
    //     TranslateService,
    //     LocalStorageService,
    //     NotifyService,
    //     RailcarProvide,
    //     DataFilterService,
    //     SelectRailcarService
    // ]
})
export class AppMainComponent implements OnInit {
    private data: string;
    private daat2: string;


    constructor() {

        this.data = 'Data';
    }

    ngOnInit() {
        this.daat2 = 'Data 2';
    }

}

