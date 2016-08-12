import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { TranslatePipe }  from 'ng2-translate';
import { RailcarService } from '../../railcars.service';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { DataFilterService } from '../../../filters-data/filter-data.service';

@Component({
    moduleId: module.id,
    selector: 'wblg-railcar-file-upload',
    templateUrl: 'railcar-file-upload.component.html',
    pipes: [TranslatePipe],
    directives: [AlertComponent]
})

export class RailcarFileUploadComponent {

    public content: string;
    public contentSpan: string;
    public fname: string;
    public url: SafeResourceUrl;
    public isDisabledEditor: boolean;

    private message: string;
    private visibility: boolean;
    private type: string;
    private time: number;

    private editBtnClass: { [key: string]: boolean };
    private editBtnIconClass: { [key: string]: boolean };

    constructor(private _railcar: RailcarService,
        private _sn: DomSanitizationService) {
        this.setDisabledEditor(true);
        this.visibility = false;
    }

    public readNow(input: HTMLInputElement): void {
        var file: File = input.files[0];
        this.fname = file.name;

        var myReader: FileReader = new FileReader();
        myReader.readAsText(file);

        myReader.onloadend = (e) => {
            this.content = myReader.result;
            this.contentSpan = this.Syntax(this.content);
            this.save(this.content);
        };
    }

    public setDisabledEditor(val: boolean): void {
        this.isDisabledEditor = val;
        this.editBtnClass = {
            'btn-checked': !this.isDisabledEditor,
            'btn-active': !this.isDisabledEditor,
        }
        this.editBtnIconClass = {
            'fa-file-text-o': this.isDisabledEditor,
            'fa-edit': !this.isDisabledEditor
        }
    }

    public save(data: string): void {
        this.content = data;
        var blob = new Blob([this.content], { type: 'application/xml' });
        this.url = this._sn.bypassSecurityTrustUrl((window.URL.createObjectURL(blob)));
    }

    public load(): void {
        this.setMessage('MESSAGE.LOADING', 5);
        this._railcar.getRailcarFile(this.content).subscribe((data: string): void => {
            this.content = data;
            this.syntaxInputText();
        }, (err: string): void => {
            this.setMessage(err, 0, 'error');

        });
    }

    private changeSpannedText(data: HTMLElement): void {
        this.content = data.innerText;
        this.save(this.content);
    }

    private syntaxInputText() {
        this.contentSpan = this.Syntax(this.content);
    }

    private setMessage(_mess: string, _time: number, _type: string = 'info'): void {
        this.message = _mess;
        this.time = _time;
        this.type = _type;
        this.visibility = true;
    }

    private clearSyntax(code: string): string {
        let clearCode: string = code;
        var comments: string[] = [];
        var strings: string[] = [];
        var textxml: string[] = [];
        var all = { 'C': comments, 'S': strings, 'R': textxml };
        var safe = {
            '&lt;': '<',
            '&gt;': '>',
            '&#47;': '/',
            '&nbsp;': ' ',
            '&amp;': '&'
        }
        //--> get all comments
        clearCode = clearCode.replace(
            /<span class=\"C\">(&lt;\!\-\-[\W\w]*?\-\-\&gt\;)<\/span>/g,
            (m: string, txt: string): string => {
                var l = comments.length;
                comments.push(txt);
                return '~~~C' + l + '~~~';
            });
        //--> get text bettwen '<' and '>'
        clearCode = clearCode.replace(
            /<span class=\"R\">([\w\W]*?)<\/span\>/g,
            (m, s) => {
                var l = textxml.length;
                textxml.push(s);
                return '~~~R' + l + '~~~';
            });
        //--> get strings (attribute values)
        clearCode = clearCode.replace(
            /<span class=\"S\">([\w\W]*?)<\/span\>/gi,
            (m: string, s: string): string => {
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
            .replace(/~~~([SR])(\d+)~~~/g,
            (m: string, t: string, i: number): string => {
                return all[t][i];
            })
            .replace(/~~~([C])(\d+)~~~/g,
            (m: string, t: string, i: number): string => {
                return all[t][i];
            });
        //--> returned HTML
        clearCode = clearCode.replace(/(\&lt\;|\&gt;|\&\#47;|\&nbsp;|\&amp;)/g, (m: string) => {
            return safe[m];
        });
        clearCode = clearCode.replace(/<br\/>/g, '\n');

        return clearCode;
    }


    //--> NOTE: from  https://habrahabr.ru/post/43030/
    private Syntax(code: string): string {
        let code_rex: string = code;
        var comments: string[] = [];
        var strings: string[] = [];
        var textxml: string[] = [];
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
        code_rex = code_rex.replace(
            /[<> \t/&]/g,
            (m: string): string => {
                return safe[m];
            });
        //--> comments
        code_rex = code_rex.replace(/&lt;\!\-\-([\W\w]*?)\-\-\&gt\;/g,
            (m: string): string => {
                var l = comments.length;
                comments.push(m);
                return '~~~C' + l + '~~~';
            });
        //--> strings
        code_rex = code_rex.replace(
            /&gt;([\w\W]*?)&lt;/g,
            (m, s) => {
                var l = textxml.length;
                textxml.push(s);
                return '&gt;~~~R' + l + '~~~&lt;';
            });
        //--> text xml
        code_rex = code_rex.replace(
            /((?:'(?:\\'|[^'])*')|(?:"(?:\\"|[^"])*"))/g,
            (m: string, f: string): string => {
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
            .replace(/~~~([SR])(\d+)~~~/g,
            (m: string, t: string, i: number): string => {
                return '<span class="' + t + '">' + all[t][i] + '</span>';
            })
            .replace(/~~~([C])(\d+)~~~/g,
            (m: string, t: string, i: number): string => {
                return '<span class="' + t + '">' + all[t][i] + '</span>';
            });
        //--> check \n
        code_rex = code_rex.replace(/\n/g, '<br/>');
        return code_rex;
    }
}
