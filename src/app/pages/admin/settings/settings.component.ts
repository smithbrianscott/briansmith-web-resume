import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../@core/interfaces/user-info';
import { TGHHttpService } from '../../../@core/data/tgh-http.service';

@Component({
  selector: 'tgh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: UserInfo = new UserInfo();

  constructor(private httpService: TGHHttpService) { }

  ngOnInit() {
    
  }

}
