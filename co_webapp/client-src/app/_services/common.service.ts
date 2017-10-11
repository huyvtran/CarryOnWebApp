import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTES } from '../sidebar/sidebar-routes.config';
import { CoGlobalsService } from "app/_services/coGlobals.service";
import { ErrorMngService } from "app/_services/errorMng.service";

declare var google: any;

@Injectable()
export class CommonService {
    public publishingItem: boolean;
    public reqBody;
    public devUrl: string;

    constructor(private http: Http, private coGlobalsService: CoGlobalsService,
        private errorMngService: ErrorMngService) { }

    publishItem(itemToPublish: any, isTransportAvailability: boolean): any {

        if (isTransportAvailability === true) {
            this.devUrl = this.coGlobalsService.getAppUrl() + 'api/TransportAv/PublishItem';
        } else {
            this.devUrl = this.coGlobalsService.getAppUrl() + 'api/ReqGoodTransfer/PublishItem';
        };

        this.reqBody = itemToPublish;

        this.publishingItem = true;
        return this.http.post(this.devUrl, this.reqBody)
            //return this.http.get(this.devUrl)
            .map((response) => {
                // some response manipulation
                return response.json()
            })
            .toPromise();
    };
      
}



