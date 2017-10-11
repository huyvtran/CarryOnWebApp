import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CoGlobalsService } from './coGlobals.service';
import { ErrorMngService } from './errorMng.service';

@Injectable()
export class RqgtService {
    public reqBody;
    public devUrl: string;
    public currentRqgt: any;
    public currentRqgtResults = [];
    public loadedRqgtResults = false;

    constructor(private http: Http, private _coGlobalsService: CoGlobalsService,
        private errorMngService: ErrorMngService) { }


    getFilteredRqgt(): any {
        this.devUrl = this._coGlobalsService.getAppUrl() + 'api/ReqGoodTransfer/FilteredRqgt';
        //this.devUrl = this._coGlobalsService.getAppUrl() + 'api/ReqGoodTransfer/get?id=null&userId=null';
        this.reqBody = {
            filterparams: {
                RqgtFilter: undefined,
                TransportAvModel: undefined,
                FilterParams: undefined
            }
        };

        this.loadedRqgtResults = false;
        return this.http.post(this.devUrl, this.reqBody)
            //return this.http.get(this.devUrl)
            .map((response) => {
                // some response manipulation
                return response.json()
            })
            .toPromise()
            //.then(resp => console.log(resp))
            .then((resp) => {
                this.loadedRqgtResults = true;
                if (resp.operationResult == true) {
                    this.currentRqgtResults = resp.resultData;
                    /* MOCK ONLY  - multuply results */
                    if (this.currentRqgtResults && this.currentRqgtResults.length > 0) {
                        for (var i = 0; i < 25; i++) {
                            //var copiedObj = {};
                            //angular.copy(self.currentRqgtResults[0], copiedObj);
                            let copiedObj = JSON.parse(JSON.stringify(this.currentRqgtResults[0]));
                            this.currentRqgtResults.push(copiedObj);
                        }
                    };
                    /* END MOCK ONLY  - multuply results */
                } else {
                    // use here the error msg service
                    this.errorMngService.showSystemError(resp.resultMessage);
                };
                console.log(resp);
            })
            .catch(err => {
                this.loadedRqgtResults = true;
                this.errorMngService.showSystemError(err.resultMessage);
                console.error(err)
            });
    }

    testHttp(): any {
        return this.http.get(this.devUrl)
            .toPromise()
            //.then(resp => console.log(resp))
            .then(function (resp) {
                localStorage.setItem('currentUser', 'yes yes');
                console.log(resp);
            })
            .catch(err => {
                console.error(err)
            });

    }

}



