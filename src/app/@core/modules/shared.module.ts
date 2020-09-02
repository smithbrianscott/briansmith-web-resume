import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSecurityModule } from '@nebular/security';
import { AgGridModule } from 'ag-grid-angular';
import {
  NbBadgeModule,
  NbSelectModule,
  NbActionsModule,
  NbCardModule,
  NbRadioModule,
  NbAlertModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbStepperModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule,
  NbSpinnerModule,
  NbDialogModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ImageService } from '../data/image.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { MaterialModule } from './material.module';
import { QuillModule } from 'ngx-quill'
import { QuillEditorToolbarConfig } from '../config/quill-editor-toolbar-config';
import { DialogConfig } from '../config/dialog-config';

const NB_MODULES = [
  NbBadgeModule,
  NbSelectModule,
  NbCardModule,
  NbRadioModule,
  NbAlertModule,
  NbStepperModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbSecurityModule, // *nbIsGranted directive,
  NbProgressBarModule,
  NbSpinnerModule,
  NbThemeModule,
];

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule.forRoot(),
      ReactiveFormsModule,
      NB_MODULES,
      RouterModule,
      NgbModule,
      CKEditorModule,
      AgGridModule.withComponents(null),
      QuillModule.forRoot({
        modules: {
          toolbar: QuillEditorToolbarConfig
        }
      }),
      NbDialogModule.forRoot(DialogConfig),
    ],
    exports: [
        MaterialModule,
        ...NB_MODULES,
        FormsModule,
        CKEditorModule,
        AgGridModule,
        NbDialogModule,
        QuillModule,
    ],
    declarations: [

    ],
    providers: [ ImageService ],
    entryComponents: [

    ]
})
export class SharedModule { }
