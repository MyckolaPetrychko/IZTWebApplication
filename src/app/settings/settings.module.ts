import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './userlist/user-list.service';
import { DataFilterService } from '../railcars/common/services/filters-data/filter-data.service';
 
@NgModule({
    imports: [BrowserModule, SharedModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent],
    providers: [DataFilterService, UserService]
    // bootstrap: [SettingsComponent]
})
export class SettingsModule { }