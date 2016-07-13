import { Component, OnInit } from '@angular/core';


import { ButtonComponent} from '../shared/button/button.component';
import { WblgBtnActiveDirective } from '../shared/button/button-active.directive';
import { TableComponent } from '../shared/table/table.component';

import { DisparityListComponent } from '../disparity/disparity.component';
import { DisparityRailcarComponent } from './disparitys/railcars-disparity.component';
import { RailcarListComponent } from './list/railcars-list.component';

import { RailcarProvide } from './railcars.provide'

@Component({
    moduleId: module.id,
    selector: 'wblg-railcars',
    templateUrl: 'railcars.component.html',
    styleUrls: ['./railcars.component.css'],
    directives: [ButtonComponent, 
    WblgBtnActiveDirective, 
     DisparityListComponent, 
     DisparityRailcarComponent, 
     RailcarListComponent],
     providers: [RailcarProvide],
})
export class RailcarsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
