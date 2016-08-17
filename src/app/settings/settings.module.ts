import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsComponent } from './settings.component';
import { DropDownListComponent } from './userlist/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './userlist/user-list.service';
import { DataFilterUserService } from './userlist/user-filter.service';
import { UserDetailComponent } from './userlist/userDetail/userDetail.component';
 
@NgModule({
    imports: [BrowserModule, SharedModule],
    declarations: [SettingsComponent, DropDownListComponent, UserDetailComponent],
    exports: [SettingsComponent],
    providers: [DataFilterUserService, UserService]
    // bootstrap: [SettingsComponent]
})
export class SettingsModule { }