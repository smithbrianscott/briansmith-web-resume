import { Component, OnInit } from '@angular/core';
import { SideBarDef, GridApi, ColumnApi, ColDef } from 'ag-grid-community';
import { UserInfo } from '../../../@core/interfaces/user-info';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-grid-demo',
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.scss']
})
export class GridDemoComponent implements OnInit {

  users: UserInfo[] = [];
  noRowsMessage: string = 'No rows found';

  agGridThemeClass: string = "ag-theme-balham";
  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public columnDefs: ColDef[];
  public domLayout: string = 'autoHeight';
  public rowSelection: string = 'multiple';
  public rowGroupPanelShow: string;
  public sideBar: SideBarDef = this.getSideBarDefs();

  constructor(private themeService: NbThemeService) {
    this.themeService.onThemeChange()
          .subscribe((theme) => {
            this.agGridThemeClass = theme?.name == 'tgh-light' ? 'ag-theme-balham' : 'ag-theme-balham-dark';
          });
   }

  ngOnInit() {
    this.rowGroupPanelShow = "always";
    
    this.users = [
      {
        userID: 1,
        fullName: 'Brian Smith',
        email: 'briansmith@tgh.org',
        firstName: 'Brian',
        lastName: 'Smith',
        created: new Date(),
        createdBy: 'briansmith@tgh.org',
        modified: new Date(),
        modifiedBy: 'briansmith@tgh.org',
        isEnabled: true,
        userImage: '',
        title: 'Software Engineer'
      },
      {
        userID: 2,
        fullName: 'Patrick Florian',
        email: 'pflorian@tgh.org',
        firstName: 'Patrick',
        lastName: 'Florian',
        created: new Date(),
        createdBy: 'briansmith@tgh.org',
        modified: new Date(),
        modifiedBy: 'briansmith@tgh.org',
        isEnabled: true,
        userImage: '',
        title: 'Software Engineer'
      },
      {
        userID: 3,
        fullName: 'Sasuke Hirano',
        email: 'shirano@tgh.org',
        firstName: 'Sasuke',
        lastName: 'Hirano',
        created: new Date(),
        createdBy: 'briansmith@tgh.org',
        modified: new Date(),
        modifiedBy: 'briansmith@tgh.org',
        isEnabled: true,
        userImage: '',
        title: 'Software Engineer'
      }
    ]
  }

  /****************************************************************************/
  /*                                  AG-GRID                                 */
  /****************************************************************************/
  onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;

    this.getColumnDefs();
  }

  getSideBarDefs(): SideBarDef {
    return {
        toolPanels: ['columns']
    }
  }

  getColumnDefs() {
      this.columnDefs = 
      [
          {
              headerName: 'UserID',
              field: 'userID',
              sortable: true,
              filter: true,
          },
          {
              headerName: 'Name',
              field: 'fullName',
              enableRowGroup: true,
              sortable: true,
              filter: true,
          },
          {
              headerName: 'Email',
              field: 'email',
              enableRowGroup: true,
              sortable: true,
              filter: true,
          },
      ]
  }

}
