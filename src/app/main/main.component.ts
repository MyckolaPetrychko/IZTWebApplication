import {HTTP_PROVIDERS, Http } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {TranslateService,
    TranslatePipe,
    TranslateLoader,
    TranslateStaticLoader} from 'ng2-translate';


import { LocalStorageService } from '../common/servises/storage.service';
import { NotifyService } from '../common/servises/notify.server';


import { Component, OnInit, provide } from '@angular/core';


// import { RailcarsComponent } from '../railcars/railcar-main-page/railcars.component';
import { DataFilterService } from '../filters-data/filter-data.service';
import { RailcarProvide } from '../railcars/railcars.provide';

import {
    FooterComponent
} from '../shared/footer/footer.component';
import {
    NavComponent
} from '../shared/nav/nav.component';

@Component({
    moduleId: module.id,
    selector: 'wblg-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css'],
    directives: [FooterComponent, NavComponent, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe],
    providers: [
        // HTTP_PROVIDERS,
        // TRANSLATE_PROVIDERS
        {
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
            deps: [Http]
        },
        // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
        TranslateService,
        LocalStorageService,
        NotifyService,
        RailcarProvide,
        DataFilterService
    ]
})
export class AppComponent implements OnInit {
    private data: string;
    private daat2: string;


    constructor() {

        this.data = 'Data';
    }

    ngOnInit() {
        this.daat2 = 'Data 2';
    }

}

