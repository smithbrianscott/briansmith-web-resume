import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { AdalService } from 'adal-angular4';
import { UserInfo } from '../interfaces/user-info';
import { AzureUserInfo } from '../interfaces/azure-user-info';

@Injectable()
export class ImageService {

    constructor(private http: HttpClient,
                private adalService: AdalService) { }

    getImage(imageUrl: string, header: HttpHeaders): Observable<Blob> {
        return this.http.get(imageUrl, { headers: header, responseType: 'blob' })
            .map((res: Blob) => res);
    }

    getImageUrlFromBlob(blob: Blob): Promise<any> {
        let fileReader = new FileReader();
        const fileReaderPromise = new Promise(resolve => fileReader.onload = resolve);

        fileReader.readAsDataURL(blob);

        return fileReaderPromise.then((e: any) => {
            return e.srcElement.result;
        });
    }

    getPhotoForUserInfo(item: UserInfo) {        
      this.adalService.acquireToken('https://graph.microsoft.com')
        .subscribe(token => {
          let header = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Content-Type', 'image/jpeg');
          this.getImage('https://graph.microsoft.com/v1.0/users/'+ item.email +'/photos/48x48/$value', header)
            .subscribe(blob => {
              this.getImageUrlFromBlob(blob)
                .then(res => {                  
                  item.userImage = res;
                })
            });
        });
    }
}