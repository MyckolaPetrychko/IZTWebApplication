"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ng2_translate_1 = require('ng2-translate');
//import {TRANSLATE_PROVIDERS, TranslateService, TranslatePipe,
// TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';'
var FooterComponent = (function () {
    function FooterComponent(_translate) {
        this._translate = _translate;
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
    FooterComponent.prototype.ngOnInit = function () {
        this.username = 'YUsers named';
        this.isAuth = false;
        this.language = ['ua', 'ru', 'en'];
    };
    FooterComponent.prototype.changeCurrentLanguage = function (lang) {
        localStorage.setItem('NG2-TRANSLATE-LANGUAGE', lang);
        this._translate.use(lang);
    };
    FooterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-footer',
            templateUrl: 'footer.component.html',
            styleUrls: ['footer.component.css'],
            directives: [common_1.NgIf],
            pipes: [ng2_translate_1.TranslatePipe]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;

//# sourceMappingURL=footer.component.js.map
