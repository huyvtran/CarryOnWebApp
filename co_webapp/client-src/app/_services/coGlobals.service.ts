import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ROUTES } from '../sidebar/sidebar-routes.config';

@Injectable()
export class coGlobalsService {

    constructor(private http: Http) { }

    //public RoutesEnum = {
    //    DASHBOARD: 0,
    //    RQGT: 1,
    //    properties: {
    //        0: { sref: 'dashboard' },
    //        1: { sref: 'rqgt-list' }
    //    }
    //};


    /* Debug */ 
    public appUrl = 'http://localhost:57493/';
    /* Azure */ 
    //public appUrl = 'http://carryonwebapi.azurewebsites.net/';

    public gTestVar = 'Service Init!';
    public devUrl = 'https://jsonplaceholder.typicode.com/posts/100';

    public getAppUrl() {
        return this.appUrl;
    }

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



