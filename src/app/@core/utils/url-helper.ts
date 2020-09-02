import { Injectable } from '@angular/core';
import { TGHHttpService } from '../data/tgh-http.service';

@Injectable()
export class URLHelper {
    constructor(private httpService: TGHHttpService) {

    }

    private env: string = this.httpService.getCurrentEnvironment();
    private Server: string = this.getServerUrl(this.env);

    getServerUrl(env: string): string {
        let server = "";
        switch (env) {
            case "LOCALDEV": {
                server = "http://localhost/project/";
                break;
            }
            case "TEST": {
                server = "https://helpdesk-dev-api.tgh.org/";
                break;
            }
            case "PROD": {
                server = "https://helpdesk-api.tgh.org/";
                break;
            }
            default: {
                console.error('No Env Found');
                server = "https://helpdesk-api.tgh.org/";
            }
        }
        return server;
    }

    // Endpoints
    public DemoEndpoint = this.Server + 'api/<controller>/<function>';
    
}
