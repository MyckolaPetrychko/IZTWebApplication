/*
 * @author Марина Усатюк maryna.duda@innovinnprom.com
 * @date Mon 15.08.2016 13:34:48
 *
 * Copyright (c) 2016 ИННОВИННПРОМ
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { IRailcarModel } from '../../railcars-subcomponents/railcar-list/railcars-list.model';

@Injectable()
export class SelectRailcarService {
    public selectedAnnonced: Observable<IRailcarModel>;
    private selectedRailcarModel: IRailcarModel;
    private selectedSource: Subject<IRailcarModel>;

    constructor() {
        this.selectedRailcarModel = <IRailcarModel>{};
        this.selectedSource = new Subject<IRailcarModel>();
        this.selectedAnnonced = this.selectedSource.asObservable();
    }

    public selectRailcar(_selected: IRailcarModel) {
        if (
            !!_selected
            && !!_selected.inventoryid
            && _selected.inventoryid !== null
            && _selected.inventoryid !== undefined
        ) {
            this.selectedRailcarModel = _selected;
        } else {
            this.selectedRailcarModel = null;
        }
        this.selectedSource.next(this.selectedRailcarModel);

    }

    public selectedRailcar(): IRailcarModel {
        return this.selectedRailcarModel;
    }

    public isSelectedRailcar(): boolean {
        // console.log(this.selectedRailcarModel.inventoryid);
        return (!!this.selectedRailcarModel.inventoryid &&
            this.selectedRailcarModel.inventoryid !== null &&
            this.selectedRailcarModel.inventoryid !== undefined);
    }

}
