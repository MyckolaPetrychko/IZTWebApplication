import { Injectable } from '@angular/core';




@Injectable()
export class LocalStorageService {
    private colunmVisibility: string;
    private colunmVisibilityPrint: string;

    constructor() { 
        this.colunmVisibility = 'ColunmVisibility';
        this.colunmVisibilityPrint = 'ColunmVisibilityPrint';
    }

    public saveViewToStorage(_cols : any ): void {
        window.localStorage.setItem(this.colunmVisibility , JSON.stringify(_cols));
    }

    public getViewFromStorage() : any {
        return JSON.parse(window.localStorage.getItem(this.colunmVisibility));
    } 

    public saveViewPrintToStorage(_cols : any ): void {
        window.localStorage.setItem(this.colunmVisibilityPrint , JSON.stringify(_cols));
    }

    public getViewPrintFromStorage() : any {
        return JSON.parse(window.localStorage.getItem(this.colunmVisibilityPrint));
    } 
}
