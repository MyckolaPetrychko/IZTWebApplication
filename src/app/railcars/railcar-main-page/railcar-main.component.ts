import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router /*, ActivatedRoute */} from '@angular/router';

import { RefreshService } from '../common/services/refresh.service';
import { SelectRailcarService } from '../common/services/select-railcar.service';
import { RailcarService } from '../common/services/railcars-http/railcars.service';
import { UserService } from '../../shared/auth/user.service';
import { IRailcarModel } from '../railcars-subcomponents/railcar-list/railcars-list.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcars',
    templateUrl: './railcar-main.component.html',
})
export class RailcarsMainComponent implements OnInit, OnDestroy {

    public selected: IRailcarModel;
    public isSelected : boolean;
    private _selectSub : Subscription;

    private modal: boolean;
    private isTrader : boolean;
    constructor(
        private _refresh : RefreshService,
        private _select: SelectRailcarService,
        private _railcar : RailcarService,
        private _auth : UserService,
        private _router : Router ) { 

    }

    ngOnInit() {
        this.isTrader = this._auth.isAuth('trader');
        this._selectSub = this._select.selectedAnnonced.subscribe((val : IRailcarModel) : void => {
            console.log(val);
            this.selected = val;
            this.isSelected = (!!val);
        });
     }
     ngOnDestroy() {
         this._selectSub.unsubscribe();
     }

     public setRefresh(): void  {
         this._refresh.refreshData();
     }

     private gotoEditRailcar():void {
         if (this.isSelected) {
            this._router.navigate(['/railcars', this.selected.inventoryid]);
         }
     }

     private gotoAddRailcar():void {
         let temp = {};
         if (this.isSelected) {
             temp = {'template' : this.selected.inventoryid}
         }
         this._router.navigate(['/railcars', 'add', temp]);
     }

    private openModal(_val: boolean): void {
        this.modal = _val;
    }

    private ok(): void {
        this._railcar.deleteRailcar('' + this.selected.inventoryid);
        this.openModal(false);
    }

    private cancel(): void {
        this.openModal(false);
    }
}
