import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminService } from '../../@core/data/admin.service';

const routes: Routes = [{
    path: '',
    component: AdminComponent,
    children: [
        {
            path: 'settings',
            component: SettingsComponent,
        },        
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AdminService]
})
export class AdminRoutingModule { }

export const routedComponents = [
    AdminComponent,
];
