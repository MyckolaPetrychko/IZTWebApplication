import { Component, OnInit } from '@angular/core';


import { ButtonComponent} from '../shared/button/button.component';
import { WblgBtnActiveDirective } from '../shared/button/button-active.directive';
import { TableComponent } from '../shared/table/table.component';

import { DisparityListComponent } from '../disparity/disparity.component';
import { DisparityRailcarComponent } from './disparitys/railcars-disparity.component';
import { RailcarListComponent } from './list/railcars-list.component';

import { RailcarProvide } from './railcars.provide'
import { NotifyService } from '../shared/notify.server';


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
   private refreshAll : number;

    constructor(private _notify : NotifyService) { 

    }

    ngOnInit() {
        this.refreshAll = 3;
     }

     public setRefresh(): void  {
         this._notify.refreshData();

         console.log( 'refresh');
         
     }
     setSelectedRailcars (data : any) {
         console.log(data);
         
     }

     

}
