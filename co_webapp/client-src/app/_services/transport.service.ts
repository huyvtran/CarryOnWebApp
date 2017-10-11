import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CoGlobalsService } from './coGlobals.service';
import { ErrorMngService } from './errorMng.service';

@Injectable()
export class TransportService {
    public reqBody;
    public devUrl: string;
    public currentTransport: any;
    public currentTransportResults = [];
    public loadedTransportResults = false;

    constructor(private http: Http, private _coGlobalsService: CoGlobalsService,
        private errorMngService: ErrorMngService) { }
        

}



