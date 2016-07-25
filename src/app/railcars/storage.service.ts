import { Injectable } from '@angular/core';




@Injectable()
export class LocalStorageService {
    private colunmVisibility: string;

    constructor() { 
        this.colunmVisibility = 'ColunmVisibility';

    }


    public saveViewToStorage(_cols : any ): void {
        window.localStorage.setItem(this.colunmVisibility , JSON.stringify(_cols));
    }

    public getViewFromStorage() : any {
        return JSON.parse(window.localStorage.getItem(this.colunmVisibility));
    } 
}
