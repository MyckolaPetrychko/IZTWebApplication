import { Component, OnInit } from '@angular/core';

import { TranslatePipe } from 'ng2-translate';
import { RailcarListComponent } from '../routed-child/railcar-list/railcar-list.component';
@Component({
    moduleId: module.id,
    selector: 'report-railcar',
    templateUrl: 'report.component.html',
    // styleUrls: ['./report.component.css'],
    directives: [RailcarListComponent],
    pipes: [TranslatePipe] 
})
export class RailcarsReportComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
