import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../../@core/modules/shared.module';
import { AdminService } from '../../@core/data/admin.service';
import { SettingsComponent } from './settings/settings.component';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
    imports: [
        ThemeModule,
        AdminRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [AdminComponent, SettingsComponent, ...routedComponents,],
    providers: [AdminService],
})
export class AdminModule { }
