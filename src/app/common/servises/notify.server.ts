import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NotifyService {

    public refreshAnnonced: Observable<{}>;
    public selectedAnnonced: Observable<{}>;

    // Observable string sources
    private refreshInfoSource = new Subject<{}>();
    private selectedSource = new Subject<{}>();

    constructor() {
        // Observable string streams
        this.refreshAnnonced = this.refreshInfoSource.asObservable();
        this.selectedAnnonced = this.selectedSource.asObservable();
    }

    // Service message commands
    public refreshData() {
        this.refreshInfoSource.next('');
    }

    public selectedRailcar(_selected: any) {
        this.selectedSource.next(_selected);
    }

}
