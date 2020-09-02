import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdalGuard } from 'adal-angular4';
import { UIFeaturesComponent } from './ui-features.component';
import { EditorDemoComponent } from './editor-demo/editor-demo.component';
import { GridDemoComponent } from './grid-demo/grid-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { ToasterDemoComponent } from './toaster-demo/toaster-demo.component';

const routes: Routes = [{
    path: '',
    component: UIFeaturesComponent,
    children: [
        {
            path: 'editor',
            canActivate: [AdalGuard],
            component: EditorDemoComponent,
        },
        {
            path: 'grid',
            canActivate: [AdalGuard],
            component: GridDemoComponent,
        },
        {
            path: 'modal',
            canActivate: [AdalGuard],
            component: ModalDemoComponent,
        },
        {
            path: 'toaster',
            canActivate: [AdalGuard],
            component: ToasterDemoComponent,
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UIFeaturesRoutingModule { }

export const routedComponents = [
    UIFeaturesComponent
];
