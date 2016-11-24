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
var platform_browser_1 = require('@angular/platform-browser');
var ng2_translate_1 = require('ng2-translate');
var railcars_service_1 = require('../../railcars.service');
var alert_component_1 = require('../../../shared/alert/alert.component');
var RailcarFileUploadComponent = (function () {
    function RailcarFileUploadComponent(_railcar, _sn) {
        this._railcar = _railcar;
        this._sn = _sn;
        this.setDisabledEditor(true);
        this.visibility = false;
    }
    RailcarFileUploadComponent.prototype.readNow = function (input) {
        var _this = this;
        var file = input.files[0];
        this.fname = file.name;
        var myReader = new FileReader();
        myReader.readAsText(file);
        myReader.onloadend = function (e) {
            _this.content = myReader.result;
            _this.contentSpan = _this.Syntax(_this.content);
            _this.save(_this.content);
        };
    };
    RailcarFileUploadComponent.prototype.setDisabledEditor = function (val) {
        this.isDisabledEditor = val;
        this.editBtnClass = {
            'btn-checked': !this.isDisabledEditor,
            'btn-active': !this.isDisabledEditor,
        };
        this.editBtnIconClass = {
            'fa-file-text-o': this.isDisabledEditor,
            'fa-edit': !this.isDisabledEditor
        };
    };
    RailcarFileUploadComponent.prototype.save = function (data) {
        this.content = data;
        var blob = new Blob([this.content], { type: 'application/xml' });
        this.url = this._sn.bypassSecurityTrustUrl((window.URL.createObjectURL(blob)));
    };
    RailcarFileUploadComponent.prototype.load = function () {
        var _this = this;
        this.setMessage('MESSAGE.LOADING', 5);
        this._railcar.getRailcarFile(this.content).subscribe(function (data) {
            _this.content = data;
            _this.syntaxInputText();
        }, function (err) {
            _this.setMessage(err, 0, 'error');
        });
    };
    RailcarFileUploadComponent.prototype.changeSpannedText = function (data) {
        this.content = data.innerText;
        this.save(this.content);
    };
    RailcarFileUploadComponent.prototype.syntaxInputText = function () {
        this.contentSpan = this.Syntax(this.content);
    };
    RailcarFileUploadComponent.prototype.setMessage = function (_mess, _time, _type) {
        if (_type === void 0) { _type = 'info'; }
        this.message = _mess;
        this.time = _time;
        this.type = _type;
        this.visibility = true;
    };
    RailcarFileUploadComponent.prototype.clearSyntax = function (code) {
        var clearCode = code;
        var comments = [];
        var strings = [];
        var textxml = [];
        var all = { 'C': comments, 'S': strings, 'R': textxml };
        var safe = {
            '&lt;': '<',
            '&gt;': '>',
            '&#47;': '/',
            '&nbsp;': ' ',
            '&amp;': '&'
        };
        //--> get all comments
        clearCode = clearCode.replace(/<span class=\"C\">(&lt;\!\-\-[\W\w]*?\-\-\&gt\;)<\/span>/g, function (m, txt) {
            var l = comments.length;
            comments.push(txt);
            return '~~~C' + l + '~~~';
        });
        //--> get text bettwen '<' and '>'
        clearCode = clearCode.replace(/<span class=\"R\">([\w\W]*?)<\/span\>/g, function (m, s) {
            var l = textxml.length;
            textxml.push(s);
            return '~~~R' + l + '~~~';
        });
        //--> get strings (attribute values)
        clearCode = clearCode.replace(/<span class=\"S\">([\w\W]*?)<\/span\>/gi, function (m, s) {
            var l = strings.length;
            strings.push(s);
            return '~~~S' + l + '~~~';
        });
        //--> set bold attributte name
        clearCode = clearCode.replace(/\<span class=\"kwrd\">([\w\W]*?)<\/span\>/gi, '$1');
        //--> set propertys 
        clearCode = clearCode.replace(/\<span class=\"func kwrd\">([\w\W]*?)<\/span\>/gi, '$1');
        clearCode = clearCode.replace(/\<span class=\"func kwrd\">([\w\W]*?)<\/span\>/gi, '$1');
        //--> return strings | text | comments || 2 - comment bettween texts
        clearCode = clearCode
            .replace(/~~~([SR])(\d+)~~~/g, function (m, t, i) {
            return all[t][i];
        })
            .replace(/~~~([C])(\d+)~~~/g, function (m, t, i) {
            return all[t][i];
        });
        //--> returned HTML
        clearCode = clearCode.replace(/(\&lt\;|\&gt;|\&\#47;|\&nbsp;|\&amp;)/g, function (m) {
            return safe[m];
        });
        clearCode = clearCode.replace(/<br\/>/g, '\n');
        return clearCode;
    };
    //--> NOTE: from  https://habrahabr.ru/post/43030/
    RailcarFileUploadComponent.prototype.Syntax = function (code) {
        var code_rex = code;
        var comments = [];
        var strings = [];
        var textxml = [];
        var all = { 'C': comments, 'S': strings, 'R': textxml };
        var safe = {
            '<': '&lt;',
            '>': '&gt;',
            '/': '&#47;',
            ' ': '&nbsp;',
            '\t': '&nbsp;&nbsp;&nbsp;&nbsp;',
            '&': '&amp;'
        };
        //--> Hide <>/&
        code_rex = code_rex.replace(/[<> \t/&]/g, function (m) {
            return safe[m];
        });
        //--> comments
        code_rex = code_rex.replace(/&lt;\!\-\-([\W\w]*?)\-\-\&gt\;/g, function (m) {
            var l = comments.length;
            comments.push(m);
            return '~~~C' + l + '~~~';
        });
        //--> strings
        code_rex = code_rex.replace(/&gt;([\w\W]*?)&lt;/g, function (m, s) {
            var l = textxml.length;
            textxml.push(s);
            return '&gt;~~~R' + l + '~~~&lt;';
        });
        //--> text xml
        code_rex = code_rex.replace(/((?:'(?:\\'|[^'])*')|(?:"(?:\\"|[^"])*"))/g, function (m, f) {
            var l = strings.length;
            strings.push(f);
            return '~~~S' + l + '~~~';
        });
        //--> XML attribute
        code_rex = code_rex.replace(/(([\w](:\w)?)*)=/gi, '<span class="kwrd">$1</span>=');
        //--> XML Params
        code_rex = code_rex
            .replace(/([a-z\d_\-\;\#\?\!\&\:]*)&gt;/gi, '<span class="func kwrd">$1&gt;</span>')
            .replace(/&lt;(\W*[a-z0-9_\-\;\:]*)(&nbsp;)?/gi, '<span class="func kwrd">&lt;$1$2</span>');
        //--> return strings | text | comments || 2 - comment bettween texts
        code_rex = code_rex
            .replace(/~~~([SR])(\d+)~~~/g, function (m, t, i) {
            return '<span class="' + t + '">' + all[t][i] + '</span>';
        })
            .replace(/~~~([C])(\d+)~~~/g, function (m, t, i) {
            return '<span class="' + t + '">' + all[t][i] + '</span>';
        });
        //--> check \n
        code_rex = code_rex.replace(/\n/g, '<br/>');
        return code_rex;
    };
    RailcarFileUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wblg-railcar-file-upload',
            templateUrl: 'railcar-file-upload.component.html',
            pipes: [ng2_translate_1.TranslatePipe],
            directives: [alert_component_1.AlertComponent]
        }), 
        __metadata('design:paramtypes', [railcars_service_1.RailcarService, platform_browser_1.DomSanitizationService])
    ], RailcarFileUploadComponent);
    return RailcarFileUploadComponent;
}());
exports.RailcarFileUploadComponent = RailcarFileUploadComponent;

//# sourceMappingURL=railcar-file-upload.component.js.map
