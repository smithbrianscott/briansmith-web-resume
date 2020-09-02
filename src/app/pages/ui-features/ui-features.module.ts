import { NgModule } from '@angular/core';

import { SharedModule } from '../../@core/modules/shared.module';
import { AdminService } from '../../@core/data/admin.service';
import { ThemeModule } from '../../@theme/theme.module';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { EditorDemoComponent } from './editor-demo/editor-demo.component';
import { ToasterDemoComponent } from './toaster-demo/toaster-demo.component';
import { UIFeaturesRoutingModule, routedComponents } from './ui-features-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        UIFeaturesRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [...routedComponents, GridDemoComponent, ModalDemoComponent, EditorDemoComponent, ToasterDemoComponent,],
    providers: [AdminService],
})
export class UIFeaturesModule { }
