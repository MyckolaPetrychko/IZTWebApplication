import { Injectable } from '@angular/core';


import { VisibilityConf } from '../railcars/routed-child/railcar-view/view.model';

@Injectable()
export class LocalStorageService {
    private colunmVisibility: string;
    private colunmVisibilityPrint: string;

    constructor() {
        this.colunmVisibility = 'ColunmVisibility';
        this.colunmVisibilityPrint = 'ColunmVisibilityPrint';
    }

    public saveViewToStorage(_cols: VisibilityConf): void {
        window.localStorage.setItem(this.colunmVisibility, JSON.stringify(_cols));
    }

    public getViewFromStorage(): VisibilityConf {
        let _c = new VisibilityConf();
        if (window.localStorage.getItem(this.colunmVisibility)) {
            _c = <VisibilityConf>(JSON.parse(window.localStorage.getItem(this.colunmVisibility)));
        }
        return _c;
    }

    public saveViewPrintToStorage(_cols: VisibilityConf): void {
        window.localStorage.setItem(this.colunmVisibilityPrint, JSON.stringify(_cols));
    }

    public getViewPrintFromStorage(): VisibilityConf {
        let _c = new VisibilityConf();
        if (window.localStorage.getItem(this.colunmVisibilityPrint)) {
            _c = <VisibilityConf>(JSON.parse(window.localStorage.getItem(this.colunmVisibilityPrint)));
        }
        return _c;
    }
}
