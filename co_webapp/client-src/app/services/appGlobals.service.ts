import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from './HttpClient.service';

@Injectable()
export class AppGlobalsService {

    constructor(private http: HttpClient) { }

    // This is where your methods and properties go, for example: 
    public gTestVar = 'Service Init!';
    public devUrl = 'https://jsonplaceholder.typicode.com/posts/100';

    getTestVar() {
        return this.gTestVar;
    }

    setTestVar = function (val) {
        this.gTestVar = val;
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



