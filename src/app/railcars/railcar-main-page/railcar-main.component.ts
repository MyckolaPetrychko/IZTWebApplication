import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router /*, ActivatedRoute */} from '@angular/router';

import { TranslatePipe } from 'ng2-translate';


import { DisparityListComponent } from '../disparity/disparity.component';
import { NotifyService } from '../../common/servises/notify.server';


@Component({
    moduleId: module.id,
    selector: 'wblg-railcars',
    templateUrl: './railcar-main.component.html',
    directives: [
         DisparityListComponent,
         ROUTER_DIRECTIVES
     ],
     pipes: [TranslatePipe]
})
export class RailcarsMainComponent implements OnInit {
   private refreshAll : number;

    constructor(private _notify : NotifyService, private _router : Router ) { 

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
