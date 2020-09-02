import { Component, OnInit } from '@angular/core';
import { ModalExampleComponent } from '../../../@core/modals/modal-example/modal-example.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent implements OnInit {

  message: string = '';
  title: string = 'Demo Modal';

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
    
  }

  showModal() {
    const dialogRef = this.dialogService.open(ModalExampleComponent, {context: 
      {
        title: this.title
      },
    });

    dialogRef.onClose
      .subscribe((res) => {
        if (res != 'cancel') {
          this.message = res;
        }
      },
      error => {
        console.error(error);
      });
  }

}
