import { Injectable } from '@angular/core';
import { URLHelper } from '../utils/url-helper';
import { TGHHttpService } from './tgh-http.service';

@Injectable()
export class AdminService {

    constructor(private urlHelper: URLHelper, private httpSerivce: TGHHttpService) { }

}