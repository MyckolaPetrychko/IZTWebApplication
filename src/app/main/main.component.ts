// import {HTTP_PROVIDERS, Http } from '@angular/http';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {TranslateService} from 'ng2-translate/ng2-translate';
// google analiticks
declare let ga:Function;

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


constructor(public router:Router) {
        this.router.events.subscribe(
            (event:Event) => {
                if (event instanceof NavigationEnd) {
                   let newRoute = event.urlAfterRedirects || '/';
                                    //    console.log(newRoute);

                    ga('send', 'pageview', newRoute);
                }
            });
    }

    ngOnInit() {
        this.daat2 = 'Data 2';
    }

}

