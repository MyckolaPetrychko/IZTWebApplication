import { NgModule }           from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UserLoginComponent } from './login.component';
import { UserProfileComponent } from './profile.component';


import { routing } from './user.route';

@NgModule({
    imports: [SharedModule, routing],

    exports: [
        UserLoginComponent,
        UserProfileComponent
    ],

    declarations: [
        UserLoginComponent,
        UserProfileComponent
    ],
})
// RailcarListComponent: (RailcarService, DataFilterService, LocalStorageService, RefreshService, SelectRailcarService, 
export class UserModule {

}
