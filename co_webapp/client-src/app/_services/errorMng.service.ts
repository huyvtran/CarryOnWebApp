import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ErrorMngService {

    constructor(private http: Http) { }
    
    showSystemError = function (val) {
        var errorMsg = 'an error occurred';
        if (!val) {
            errorMsg += ': ' + val;
        };
        alert(errorMsg);
    };    

}



