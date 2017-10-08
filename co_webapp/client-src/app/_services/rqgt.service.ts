import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { coGlobalsService } from './coGlobals.service';


@Injectable()
export class rqgtService {
    public reqBody;
    public devUrl : string;
    
    constructor(private http: Http, private _coGlobalsService: coGlobalsService) { }
  

    getFilteredRqgt(): any {
        //this.devUrl = this._coGlobalsService.getAppUrl() + 'api/ReqGoodTransfer/FilteredRqgt';
        this.devUrl = this._coGlobalsService.getAppUrl() + 'api/ReqGoodTransfer/get?id=null&userId=null';
        this.reqBody = {
            filterparams: {
                RqgtFilter: undefined,
                TransportAvModel: undefined,
                FilterParams: undefined
            }
        };
        
        //return this.http.post(this.devUrl, this.reqBody)
        return this.http.get(this.devUrl)
        .toPromise()
        //.then(resp => console.log(resp))
        .then(function (resp) {
            localStorage.setItem('currentUser', 'yes yes');
            console.log(resp);
        })
        .catch(err => console.error(err));

}

    testHttp(): any {
        return this.http.get(this.devUrl)
            .toPromise()
            //.then(resp => console.log(resp))
            .then(function (resp) {
                localStorage.setItem('currentUser', 'yes yes');
                console.log(resp);
            })
            .catch(err => console.error(err));

    }

}



