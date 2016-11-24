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
var forms_1 = require('@angular/forms');
var noop = function () {
    // noop
};
exports.DATEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MyDatePicker; }),
    multi: true
};
var MyDatePicker = (function () {
    function MyDatePicker(elem, _translate) {
        var _this = this;
        this.elem = elem;
        this._translate = _translate;
        this.idName = 'calendarID';
        this.inline = false;
        this.clear = false;
        this.endDate = false;
        this.showSelector = false;
        this.visibleMonth = { monthTxt: '', monthNbr: 0, year: 0 };
        this.defaultDate = { year: 0, month: 0, day: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.selectionDayTxt = '';
        this.dayIdx = 0;
        this.today = null;
        this.PREV_MONTH = 1;
        this.CURR_MONTH = 2;
        this.NEXT_MONTH = 3;
        // Default options
        this.dayLabels = { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' };
        this.monthLabels = {
            1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May',
            6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
        };
        this.dateFormat = 'yyyy-mm-dd';
        this.todayBtnTxt = 'Today';
        this.firstDayOfWeek = 'mo';
        this.sunHighlight = true;
        this.height = '20px';
        this.width = '100%';
        this.disableUntil = { year: 0, month: 0, day: 0 };
        this.disableSince = { year: 0, month: 0, day: 0 };
        this.disableWeekends = false;
        // inline: boolean = false;
        //Placeholders for the callbacks which are later providesd
        //by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        //The internal data model
        this.innerValue = null;
        this._locales = {
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
        this.today = new Date();
        var doc = document.getElementsByTagName('html')[0];
        doc.addEventListener('click', function (event) {
            if (_this.showSelector && event.target
                && _this.elem.nativeElement !== event.target
                && !_this.elem.nativeElement.contains(event.target)) {
                _this.showSelector = false;
            }
        }, false);
    }
    MyDatePicker.prototype.ngOnInit = function () {
        var _this = this;
        this._subTranslate = this._translate.onLangChange.subscribe(function (event) {
            _this.changeLocale();
        });
        if (this.inline) {
            this.openBtnClicked();
        }
        this.changeLocale();
    };
    MyDatePicker.prototype.ngOnDestroy = function () {
        this._subTranslate.unsubscribe();
    };
    MyDatePicker.prototype.changeLocale = function () {
        var localeOptions = {};
        var locale = this._translate.currentLang;
        if (locale && this._locales.hasOwnProperty(locale)) {
            localeOptions = this._locales[locale];
        }
        // the relatively ugly casts to any in this loop are needed to
        // avoid tsc errors when noImplicitAny is true.
        var optionprops = ['dayLabels', 'monthLabels', 'dateFormat',
            'todayBtnTxt', 'firstDayOfWeek', 'sunHighlight'];
        var noptionprops = optionprops.length;
        for (var i_1 = 0; i_1 < noptionprops; i_1++) {
            var propname = optionprops[i_1];
            if (this.options && this.options[propname] !== undefined) {
                this[propname] = this.options[propname];
            }
            else {
                if (localeOptions.hasOwnProperty(propname)) {
                    this[propname] = localeOptions[propname];
                }
            }
        }
        if (this.selectedDate.year !== 0) {
            this.selectionDayTxt = this.formatDate(this.selectedDate);
        }
        this.weekDays = [];
        var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.dayIdx = days.indexOf(this.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < days.length; i++) {
                this.weekDays.push(this.dayLabels[days[idx]]);
                idx = days[idx] === 'sa' ? 0 : idx + 1;
            }
        }
    };
    MyDatePicker.prototype.removeBtnClicked = function () {
        this.selectionDayTxt = '';
        this.selectedDate = { day: 0, month: 0, year: 0 };
        this.innerValue = null;
        this.onChangeCallback(this.innerValue);
    };
    MyDatePicker.prototype.openBtnClicked = function () {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            var y = 0, m = 0;
            if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                if (this.defaultDate.year === 0 && this.defaultDate.month === 0) {
                    y = this.today.getFullYear();
                    m = this.today.getMonth() + 1;
                }
                else {
                    y = this.defaultDate.year;
                    m = this.defaultDate.month;
                }
            }
            else {
                y = this.selectedDate.year;
                m = this.selectedDate.month;
            }
            // Set current month
            this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };
            // Create current month
            this.createMonth(m, y);
        }
    };
    MyDatePicker.prototype.prevMonth = function () {
        var m = this.visibleMonth.monthNbr;
        var y = this.visibleMonth.year;
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.createMonth(m, y);
    };
    MyDatePicker.prototype.nextMonth = function () {
        var m = this.visibleMonth.monthNbr;
        var y = this.visibleMonth.year;
        if (m === 12) {
            m = 1;
            y++;
        }
        else {
            m++;
        }
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.createMonth(m, y);
    };
    MyDatePicker.prototype.prevYear = function () {
        this.visibleMonth.year--;
        this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
    };
    MyDatePicker.prototype.nextYear = function () {
        this.visibleMonth.year++;
        this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
    };
    MyDatePicker.prototype.todayClicked = function () {
        // Today selected
        var m = this.today.getMonth() + 1;
        var y = this.today.getFullYear();
        this.selectDate({ day: this.today.getDate(), month: m, year: y });
        if (this.inline) {
            this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };
            this.createMonth(m, y);
        }
        if (this.endDate) {
            this.innerValue = new Date(y, this.today.getMonth(), this.today.getDate(), 23, 59, 59, 999);
        }
        else {
            this.innerValue = new Date(y, this.today.getMonth(), this.today.getDate(), 0, 0, 0, 0);
        }
        this.onChangeCallback(this.innerValue);
    };
    MyDatePicker.prototype.cellClicked = function (cell) {
        // Cell clicked in the selector
        if (cell.cmo === this.PREV_MONTH) {
            // Previous month of day
            this.prevMonth();
        }
        else if (cell.cmo === this.CURR_MONTH) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.NEXT_MONTH) {
            // Next month of day
            this.nextMonth();
        }
    };
    MyDatePicker.prototype.selectDate = function (date) {
        this.selectedDate = { day: date.day, month: date.month, year: date.year };
        this.selectionDayTxt = this.formatDate(this.selectedDate);
        this.showSelector = false;
        if (this.endDate) {
            this.innerValue = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, 23, 59, 59, 999);
        }
        else {
            this.innerValue = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, 0, 0, 0, 0);
        }
        this.onChangeCallback(this.innerValue);
    };
    MyDatePicker.prototype.preZero = function (val) {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? '0' + val : val;
    };
    MyDatePicker.prototype.formatDate = function (val) {
        return this.dateFormat.replace('yyyy', val.year)
            .replace('mm', this.preZero(val.month))
            .replace('dd', this.preZero(val.day));
    };
    MyDatePicker.prototype.monthText = function (m) {
        // Returns mont as a text
        return this.monthLabels[m];
    };
    MyDatePicker.prototype.monthStartIdx = function (y, m) {
        // Month start index
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    MyDatePicker.prototype.daysInMonth = function (m, y) {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    };
    MyDatePicker.prototype.daysInPrevMonth = function (m, y) {
        // Return number of days of the previous month
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        return this.daysInMonth(m, y);
    };
    MyDatePicker.prototype.isCurrDay = function (d, m, y, cmo) {
        // Check is a given date the current date
        return d === this.today.getDate()
            && m === this.today.getMonth() + 1
            && y === this.today.getFullYear() && cmo === 2;
    };
    MyDatePicker.prototype.isDisabledDay = function (date) {
        // Check is a given date <= disabledUntil or given date >= disabledSince or disabled weekend
        var givenDate = this.getTimeInMilliseconds(date);
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
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }
        return false;
    };
    MyDatePicker.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month, date.day, 0, 0, 0, 0).getTime();
    };
    MyDatePicker.prototype.getDayNumber = function (date) {
        // Get day number: sun=0, mon=1, tue=2, wed=3 ...
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    };
    MyDatePicker.prototype.sundayIdx = function () {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    MyDatePicker.prototype.createMonth = function (m, y) {
        this.dates.length = 0;
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.PREV_MONTH;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: y, month: m - 1, day: j };
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
                    var date = { year: y, month: m, day: dayNbr };
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
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    var date = { year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr };
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
    };
    //From ControlValueAccessor interface
    MyDatePicker.prototype.writeValue = function (value) {
        var val = new Date(+value);
        console.log(val);
        if (value && value !== null && value !== undefined && val) {
            this.innerValue = val;
            this.selectDate({ year: val.getFullYear(), month: val.getMonth() + 1, day: val.getDate() });
        }
        else {
            this.removeBtnClicked();
        }
    };
    //From ControlValueAccessor interface
    MyDatePicker.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    MyDatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input('id'), 
        __metadata('design:type', String)
    ], MyDatePicker.prototype, "idName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MyDatePicker.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MyDatePicker.prototype, "clear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MyDatePicker.prototype, "endDate", void 0);
    MyDatePicker = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-date-picker',
            directives: [common_1.NgIf, common_1.NgFor, common_1.NgClass, common_1.NgStyle],
            templateUrl: './my-date-picker.component.html',
            providers: [exports.DATEPICKER_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ng2_translate_1.TranslateService])
    ], MyDatePicker);
    return MyDatePicker;
}());
exports.MyDatePicker = MyDatePicker;

//# sourceMappingURL=my-date-picker.component.js.map
