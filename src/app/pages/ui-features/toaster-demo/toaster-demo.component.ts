import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-toaster-demo',
  templateUrl: './toaster-demo.component.html',
  styleUrls: ['./toaster-demo.component.scss']
})
export class ToasterDemoComponent implements OnInit {

  header: string = 'Header';
  message: string = 'Message';
  toastType: string = 'success';
  toastTypeList: any = [
    {
      name: 'success'
    },
    {
      name: 'error'
    },
    {
      name: 'warning'
    },
    {
      name: 'info'
    }
  ]

  constructor(private toasterService: ToastrService) { }

  ngOnInit() {
    
  }

  popToast() {
    switch(this.toastType) {
      case 'success':
        this.toasterService.success(this.message, this.header);
        break;
      case 'error':
        this.toasterService.error(this.message, this.header);
        break;
      case 'warning':
        this.toasterService.warning(this.message, this.header);
        break;
      case 'info':
        this.toasterService.info(this.message, this.header);
    }
  }

}
