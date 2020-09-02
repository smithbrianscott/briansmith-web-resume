import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import * as $ from 'jquery';
import 'jqueryui';

@Component({
    selector: 'tgh-modal-example',
    templateUrl: 'modal-example.component.html'
})

export class ModalExampleComponent implements OnInit {

    onSubmitSubject: Subject<string> = new Subject<string>();
    title: string;
    loading: boolean = false; 
    message: string = '';

    constructor(protected ref: NbDialogRef<ModalExampleComponent>,) {
        
     }

    ngOnInit() {
      $(document).ready(function () {
        let modalContent: any = $('nb-dialog-container');
        modalContent.draggable({
          handle: 'nb-card-header'
        });
      });
     }

    close() {
      this.ref.close('cancel');
    }

    onSubmit() {
        this.loading = true;
        this.ref.close(this.message);
    }
}