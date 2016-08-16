import { Component, OnInit } from '@angular/core';
// import { NgIf } from '@angular/common';

import { TranslateService } from 'ng2-translate/ng2-translate';
//import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe,
// TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';'

@Component({
    moduleId: module.id,
    selector: 'wblg-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css'],
    // directives: [NgIf],
    // pipes: [TranslatePipe]
})
export class FooterComponent implements OnInit {
    private company: string;
    private username: string;
    private isAuth: boolean;

    private language: any;
    private currLang: any;

    constructor(private _translate: TranslateService) {
        this.company = 'IZT';
        this.isAuth = false;

        this.language = [];

        var userLang = localStorage.getItem('NG2-TRANSLATE-LANGUAGE');
        if (!userLang)
          userLang = navigator.language.split('-')[0]; // use navigator lang if available
         
        userLang = /(ua|en|ru)/gi.test(userLang) ? userLang : 'ua';

      //  this language will be used as a fallback when a translation isn't found in the current language
         this._translate.setDefaultLang('ua');
        this.currLang = userLang;

       // the lang to use, if the lang isn't available, it will use the current loader to get them
         this._translate.use(userLang);

    }

    ngOnInit() {
        this.username = 'YUsers named';
        this.isAuth = false;

        this.language = ['ua', 'ru', 'en'];

    }

    public changeCurrentLanguage(lang: string) {
        localStorage.setItem('NG2-TRANSLATE-LANGUAGE', lang);
        this._translate.use(lang);
    }
}
