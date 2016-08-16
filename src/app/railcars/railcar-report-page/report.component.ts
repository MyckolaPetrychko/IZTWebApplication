import { Component, OnInit } from '@angular/core';

import { RailcarListComponent } from '../railcars-subcomponents/railcar-list/railcar-list.component';
@Component({
    moduleId: module.id,
    selector: 'report-railcar',
    templateUrl: 'report.component.html',
    // styleUrls: ['./report.component.css'],
    // directives: [RailcarListComponent],
})
export class RailcarsReportComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
