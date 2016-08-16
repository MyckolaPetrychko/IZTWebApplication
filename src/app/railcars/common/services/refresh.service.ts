import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RefreshService {

    public refreshAnnonced: Observable<{}>;

    // Observable string sources
    private refreshInfoSource = new Subject<{}>();

    constructor() {
        // Observable string streams
        this.refreshAnnonced = this.refreshInfoSource.asObservable();
    }

    // Service message commands
    public refreshData() {
        this.refreshInfoSource.next('');
    }

}
