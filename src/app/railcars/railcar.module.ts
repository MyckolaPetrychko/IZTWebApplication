import { NgModule }           from '@angular/core';
// import { CommonModule }       from '@angular/common';
import { RouterModule }        from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { RailcarNumberValidator }        from './common/directives/railcar-number.validator';
import { SelectRailcarService } from './common/services/select-railcar.service';
import { RefreshService } from './common/services/refresh.service';
import { RailcarService } from './common/services/railcars-http/railcars.service';
import { DataFilterService } from './common/services/filters-data/filter-data.service';

import { RailcarsMainComponent } from './railcar-main-page/railcar-main.component';
import { RailcarsReportComponent } from './railcar-report-page/report.component';

import { DisparityListComponent } from './disparity/disparity.component';
import { DisparityService } from './disparity/disparity.service';

import { RailcarDisparityComponent} from './railcars-subcomponents/railcar-disparity/railcar-disparity.component';
import { RailcarEditComponent } from './railcars-subcomponents/railcar-edit/railcar-edit.component';
import { RailcarFileUploadComponent } from './railcars-subcomponents/railcar-file-upload/railcar-file-upload.component';
import { RailcarListComponent} from './railcars-subcomponents/railcar-list/railcar-list.component';
import { VisibilityConfigComponent} from './railcars-subcomponents/railcar-view/view.component';

import { routing } from './railcar.route';

@NgModule({
    imports: [SharedModule, routing],

    providers: [
        DataFilterService,
        RailcarService,
        RefreshService,
        SelectRailcarService,
        DisparityService,
    ],
    exports: [
        RailcarsMainComponent,
        RailcarsReportComponent
    ],

    declarations: [
        RailcarDisparityComponent,
        RailcarEditComponent,
        RailcarFileUploadComponent,
        RailcarListComponent,
        VisibilityConfigComponent,

        RailcarsMainComponent,
        RailcarsReportComponent,
        DisparityListComponent,
        RailcarNumberValidator
    ],
})
// RailcarListComponent: (RailcarService, DataFilterService, LocalStorageService, RefreshService, SelectRailcarService, 
export class RailcarsModule {

}
