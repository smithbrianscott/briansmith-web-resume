import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
            component: EditorDemoComponent,
        },
        {
            path: 'grid',
            component: GridDemoComponent,
        },
        {
            path: 'modal',
            component: ModalDemoComponent,
        },
        {
            path: 'toaster',
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
