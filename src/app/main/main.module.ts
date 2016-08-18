import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { AppMainComponent }  from './main.component';
// import { FormsModule }         from '@angular/forms';
// import {  Http } from '@angular/http';
// import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { enableProdMode } from '@angular/core';

import { SharedModule } from '../shared/shared.module'
import { RailcarsModule } from '../railcars/railcar.module';
import { SettingsModule } from '../settings/settings.module'; 
import { UserModule } from '../user/user.module';
import { routerProviders } from './main.routers';
import {routing} from './main.routers';

enableProdMode();

@NgModule({
  imports: [
    // BrowserModule,
    // FormsModule,
    routing,
    SharedModule.forRoot(),
    RailcarsModule,
    SettingsModule,
    UserModule

  ],
  declarations: [AppMainComponent],
  providers: [ ...routerProviders ],
  bootstrap: [AppMainComponent]
})

export class AppMainModule { }
