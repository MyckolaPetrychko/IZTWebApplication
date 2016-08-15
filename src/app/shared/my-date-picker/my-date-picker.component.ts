import {Component, Input, Output, EventEmitter, OnInit, OnDestroy,
    ElementRef, Provider, forwardRef} from '@angular/core';
import {NgIf, NgFor, NgClass, NgStyle, NgModel } from '@angular/common';
import {IMyDate, IMyMonth, IMyWeek, IMyDayLabels, IMyMonthLabels, IMyLocales, IMyOptions} from './interfaces/index';

import { TranslatePipe, TranslateService, LangChangeEvent } from 'ng2-translate';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

const noop = () => {
    // noop
};

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyDatePicker),
    multi: true
};

@Component({
    moduleId: module.id,
    selector: 'my-date-picker',
    directives: [NgIf, NgFor, NgClass, NgStyle],
    templateUrl: './my-date-picker.component.html',
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class MyDatePicker implements OnInit, ControlValueAccessor, OnDestroy {
    public options: any;

    @Input('id') idName: string = 'calendarID';
    @Input() inline: boolean = false;
    @Input() clear: boolean = false;
    @Input() endDate: boolean = false;

    showSelector: boolean = false;

    visibleMonth: IMyMonth = { monthTxt: '', monthNbr: 0, year: 0 };
    defaultDate: IMyDate = { year: 0, month: 0, day: 0 };
    selectedDate: IMyDate = { year: 0, month: 0, day: 0 };

    weekDays: Array<string> = [];
    dates: Array<Object> = [];
    selectionDayTxt: string = '';
    dayIdx: number = 0;
    today: Date = null;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    // Default options
    dayLabels: IMyDayLabels = { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' };
    monthLabels: IMyMonthLabels = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May',
        6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    };
    dateFormat: string = 'yyyy-mm-dd';
    todayBtnTxt: string = 'Today';
    firstDayOfWeek: string = 'mo';
    sunHighlight: boolean = true;
    height: string = '20px';
    width: string = '100%';
    disableUntil: IMyDate = { year: 0, month: 0, day: 0 };
    disableSince: IMyDate = { year: 0, month: 0, day: 0 };
    disableWeekends: boolean = false;
    // inline: boolean = false;

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //The internal data model
    private innerValue: Date = null;
    private _subTranslate: Subscription;

    private _locales: IMyLocales = {
        'ja': {
            dayLabels: { su: '日', mo: '月', tu: '火', we: '水', th: '木', fr: '金', sa: '土' },
            monthLabels: {
                1: '１月', 2: '２月', 3: '３月', 4: '４月', 5: '５月',
                6: '６月', 7: '７月', 8: '８月', 9: '９月', 10: '１０月', 11: '１１月', 12: '１２月'
            },
            dateFormat: 'yyyy.mm.dd',
            todayBtnTxt: '今日',
            sunHighlight: false
        },
        'fr': {
            dayLabels: { su: 'Dim', mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam' },
            monthLabels: {
                1: 'Jan', 2: 'Fév', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Juin',
                7: 'Juil', 8: 'Aoû', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Déc'
            },
            dateFormat: 'dd/mm/yyyy',
            todayBtnTxt: 'Aujourd\'hui',
            firstDayOfWeek: 'su',
            sunHighlight: true

        },
        'ua': {
            dayLabels: { su: 'Нд', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб' },
            monthLabels: {
                1: 'Січ.', 2: 'Лют.', 3: 'Бер.', 4: 'Квіт.', 5: 'Трав.', 6: 'Черв.',
                7: 'Лип.', 8: 'Серп.', 9: 'Вер.', 10: 'Жовт.', 11: 'Лист.', 12: 'Груд.'
            },
            dateFormat: 'dd.mm.yyyy',
            todayBtnTxt: 'Сьогодні',
            firstDayOfWeek: 'mo',
            sunHighlight: true
        },
        'ru': {
            dayLabels: { su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб' },
            monthLabels: {
                1: 'Янв.', 2: 'Февр.', 3: 'Март', 4: 'Апр.', 5: 'Май', 6: 'Июнь',
                7: 'Июль', 8: 'Авг.', 9: 'Сент.', 10: 'Окт.', 11: 'Нояб.', 12: 'Дек.'
            },
            dateFormat: 'dd.mm.yyyy',
            todayBtnTxt: 'Сегодня',
            firstDayOfWeek: 'mo',
            sunHighlight: true
        },
        'en': {
            dayLabels: { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' },
            monthLabels: {
                1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May',
                6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
            },
            dateFormat: 'yyyy-mm-dd',
            todayBtnTxt: 'Today',
            firstDayOfWeek: 'su',
            sunHighlight: true
        }
    };

    constructor(public elem: ElementRef, private _translate: TranslateService) {
        this.today = new Date();
        let doc = document.getElementsByTagName('html')[0];
        doc.addEventListener('click', (event) => {
            if (this.showSelector && event.target
                && this.elem.nativeElement !== event.target
                && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = false;
            }
        }, false);
    }

    ngOnInit() {
        this._subTranslate = this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.changeLocale();
        });

        if (this.inline) {
            this.openBtnClicked();
        }

        this.changeLocale();
    }

    ngOnDestroy() {
        this._subTranslate.unsubscribe();
    }

    public changeLocale(): void {
        let localeOptions: IMyOptions = {};
        let locale = this._translate.currentLang;
        if (locale && this._locales.hasOwnProperty(locale)) {
            localeOptions = this._locales[locale];
        }

        // the relatively ugly casts to any in this loop are needed to
        // avoid tsc errors when noImplicitAny is true.
        let optionprops = ['dayLabels', 'monthLabels', 'dateFormat',
            'todayBtnTxt', 'firstDayOfWeek', 'sunHighlight'];
        let noptionprops = optionprops.length;

        for (let i = 0; i < noptionprops; i++) {
            let propname = optionprops[i];
            if (this.options && (<any>this.options)[propname] !== undefined) {
                (<any>this)[propname] = (<any>this.options)[propname];
            } else {
                if (localeOptions.hasOwnProperty(propname)) {
                    (<any>this)[propname] = (<any>localeOptions)[propname];
                }
            }
        }
        if (this.selectedDate.year !== 0) { this.selectionDayTxt = this.formatDate(this.selectedDate); }
        this.weekDays = [];
        let days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.dayIdx = days.indexOf(this.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx = this.dayIdx;
            for (var i = 0; i < days.length; i++) {
                this.weekDays.push(this.dayLabels[days[idx]]);
                idx = days[idx] === 'sa' ? 0 : idx + 1;
            }
        }
    }

    removeBtnClicked(): void {
        this.selectionDayTxt = '';
        this.selectedDate = <IMyDate>{ day: 0, month: 0, year: 0 };
        this.innerValue = null;
        this.onChangeCallback(this.innerValue);
    }

    openBtnClicked(): void {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            let y = 0, m = 0;
            if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                if (this.defaultDate.year === 0 && this.defaultDate.month === 0) {
                    y = this.today.getFullYear();
                    m = this.today.getMonth() + 1;
                } else {
                    y = this.defaultDate.year;
                    m = this.defaultDate.month;
                }
            } else {
                y = this.selectedDate.year;
                m = this.selectedDate.month;
            }
            // Set current month
            this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };

            // Create current month
            this.createMonth(m, y);
        }
    }

    prevMonth(): void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 1) {
            m = 12;
            y--;
        } else {
            m--;
        }
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.createMonth(m, y);
    }

    nextMonth(): void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 12) {
            m = 1;
            y++;
        } else {
            m++;
        }
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.createMonth(m, y);
    }

    prevYear(): void {
        this.visibleMonth.year--;
        this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear(): void {
        this.visibleMonth.year++;
        this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    todayClicked(): void {
        // Today selected
        let m = this.today.getMonth() + 1;
        let y = this.today.getFullYear();
        this.selectDate({ day: this.today.getDate(), month: m, year: y });

        if (this.inline) {
            this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };
            this.createMonth(m, y);
        }
        if (this.endDate) {
            this.innerValue = new Date(y, this.today.getMonth(), this.today.getDate(), 23, 59, 59, 999);
        } else {
            this.innerValue = new Date(y, this.today.getMonth(), this.today.getDate(), 0, 0, 0, 0);
        }
        this.onChangeCallback(this.innerValue);

    }

    cellClicked(cell: any): void {
        // Cell clicked in the selector
        if (cell.cmo === this.PREV_MONTH) {
            // Previous month of day
            this.prevMonth();
        } else if (cell.cmo === this.CURR_MONTH) {
            // Current month of day
            this.selectDate(cell.dateObj);
        } else if (cell.cmo === this.NEXT_MONTH) {
            // Next month of day
            this.nextMonth();
        }
    }

    selectDate(date: any): void {
           this.selectedDate = { day: date.day, month: date.month, year: date.year };
            this.selectionDayTxt = this.formatDate(this.selectedDate);
            this.showSelector = false;

            if (this.endDate) {
                this.innerValue = new Date(this.selectedDate.year,
                    this.selectedDate.month - 1,
                    this.selectedDate.day, 23, 59, 59, 999);
            } else {
                this.innerValue = new Date(this.selectedDate.year,
                    this.selectedDate.month - 1,
                    this.selectedDate.day, 0, 0, 0, 0);
            }
        this.onChangeCallback(this.innerValue);
    }

    preZero(val: string): string {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? '0' + val : val;
    }

    formatDate(val: any): string {
        return this.dateFormat.replace('yyyy', val.year)
            .replace('mm', this.preZero(val.month))
            .replace('dd', this.preZero(val.day));
    }

    monthText(m: number): string {
        // Returns mont as a text
        return this.monthLabels[m];
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        if (m === 1) {
            m = 12;
            y--;
        } else {
            m--;
        }
        return this.daysInMonth(m, y);
    }

    isCurrDay(d: number, m: number, y: number, cmo: any): boolean {
        // Check is a given date the current date
        return d === this.today.getDate()
            && m === this.today.getMonth() + 1
            && y === this.today.getFullYear() && cmo === 2;
    }

    isDisabledDay(date: IMyDate): boolean {
        // Check is a given date <= disabledUntil or given date >= disabledSince or disabled weekend
        let givenDate = this.getTimeInMilliseconds(date);
        if (this.disableUntil.year !== 0
            && this.disableUntil.month !== 0
            && this.disableUntil.day !== 0
            && givenDate <= this.getTimeInMilliseconds(this.disableUntil)) {
            return true;
        }
        if (this.disableSince.year !== 0
            && this.disableSince.month !== 0
            && this.disableSince.day !== 0
            && givenDate >= this.getTimeInMilliseconds(this.disableSince)) {
            return true;
        }
        if (this.disableWeekends) {
            let dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        return false;
    }

    getTimeInMilliseconds(date: IMyDate): number {
        return new Date(date.year, date.month, date.day, 0, 0, 0, 0).getTime();
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: sun=0, mon=1, tue=2, wed=3 ...
        let d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    createMonth(m: number, y: number): void {
        this.dates.length = 0;
        let monthStart = this.monthStartIdx(y, m);
        let dInThisM = this.daysInMonth(m, y);
        let dInPrevM = this.daysInPrevMonth(m, y);

        let dayNbr = 1;
        let cmo = this.PREV_MONTH;
        for (let i = 1; i < 7; i++) {
            let week: IMyWeek[] = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = { year: y, month: m - 1, day: j };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(j, m, y, cmo),
                        dayNbr: this.getDayNumber(date),
                        disabled: this.isDisabledDay(date)
                    });
                }

                cmo = this.CURR_MONTH;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    let date: IMyDate = { year: y, month: m, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo),
                        dayNbr: this.getDayNumber(date),
                        disabled: this.isDisabledDay(date)
                    });
                    dayNbr++;
                }
            } else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    let date: IMyDate = { year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr };
                    week.push({
                        dateObj: date,
                        cmo: cmo,
                        currDay: this.isCurrDay(dayNbr, m, y, cmo),
                        dayNbr: this.getDayNumber(date),
                        disabled: this.isDisabledDay(date)
                    });
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
    }

    //From ControlValueAccessor interface
    writeValue(value: number | string | Date) {
        let val: Date = new Date(+value);
        console.log(val);
        if (value && value !== null && value !== undefined && val) {
            this.innerValue = val;
            this.selectDate({ year: val.getFullYear(), month: val.getMonth() + 1, day: val.getDay() });
        } else {
            this.removeBtnClicked();
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
