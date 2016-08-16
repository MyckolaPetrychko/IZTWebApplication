import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router /*, ActivatedRoute */} from '@angular/router';



import { DisparityListComponent } from '../disparity/disparity.component';
import { RefreshService as NotifyService } from '../common/services/refresh.service';


@Component({
    moduleId: module.id,
    selector: 'wblg-railcars',
    templateUrl: './railcar-main.component.html',
    // directives: [
    //      DisparityListComponent,
    //      ROUTER_DIRECTIVES
    //  ],
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
