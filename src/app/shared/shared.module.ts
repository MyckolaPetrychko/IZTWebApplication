import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { CommonModule }        from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import {
    TranslateModule,
    TranslateStaticLoader,
    TranslateLoader, TranslatePipe, TranslateService
} from 'ng2-translate/ng2-translate';

import { AgGridNg2 } from 'ag-grid-ng2/main';


import { AuthAdminGuard } from './auth/auth-admin.guard';
import { AuthGuard } from './auth/auth-user.guard';
import { AuthService } from './auth/auth.service';

import { ValueFilterPipe } from './pipes/value-filter.pipe';
import { DataFilterPipe } from './pipes/data-filter.pipe';

import { LocalStorageService } from './services/storage.service';

import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';


import { AlertComponent } from './components/alert/alert.component';
import { ModalComponent } from './components/modal/modal.component';

import { 
    InputComponent, 
    WBLG_INPUT_CONTROL_VALUE_ACCESSOR 
} from './components/input/input.component';
import { 
    ComboboxComponent, 
    COMBOBOX_CONTROL_VALUE_ACCESSOR
 } from './components/combobox/combobox.component';
import { 
    DataComboboxComponent,
    DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR 
} from './components/data-combobox/data-combobox.component';

import { MyDatePicker, DATEPICKER_CONTROL_VALUE_ACCESSOR } from './components/my-date-picker/my-date-picker.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    declarations: [
        AgGridNg2,

        ValueFilterPipe,
        DataFilterPipe,
        FooterComponent,
        NavComponent,
        AlertComponent,
        ModalComponent,
        InputComponent,
        ComboboxComponent,
        DataComboboxComponent,
        MyDatePicker
    ],
    exports: [
        AgGridNg2,

        ValueFilterPipe,
        DataFilterPipe,
        FooterComponent,
        NavComponent,
        AlertComponent,
        ModalComponent,
        InputComponent,
        ComboboxComponent,
        DataComboboxComponent,
        MyDatePicker,

        CommonModule,
        FormsModule,
        HttpModule,
        TranslateModule
    ],
    providers: [

    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                LocalStorageService,
                AuthService,
                AuthAdminGuard,
                AuthGuard,

                DATEPICKER_CONTROL_VALUE_ACCESSOR,
                DATA_COMBOBOX_CONTROL_VALUE_ACCESSOR,
                COMBOBOX_CONTROL_VALUE_ACCESSOR,
                WBLG_INPUT_CONTROL_VALUE_ACCESSOR
            ]
        };
    }
}
