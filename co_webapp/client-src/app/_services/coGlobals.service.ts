import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTES } from '../sidebar/sidebar-routes.config';

declare var google: any;


@Injectable()
export class CoGlobalsService {

    constructor(private http: Http) { }
    
    /* Debug */ 
    //public appUrl = 'http://localhost:57493/';
    /* Azure */ 
    public appUrl = 'http://carryonwebapi.azurewebsites.net/';

    public loadGooleMaps() {
        var retPromise = new Promise((resolve, reject) => {
            var trialCounter = 0;
            var loadInterval = setInterval(() => {
                if (google != undefined) {
                    killLoadInterval();
                    resolve();
                } else if (trialCounter > 30) {
                    killLoadInterval();
                    reject();
                };
                trialCounter++;
            }, 500);

            var killLoadInterval = function () {
                if (loadInterval) {
                    clearInterval(loadInterval);
                }
            };

            // If async opp successful
            //resolve();

            // If async opp fails
            //reject();
        });
        
        return retPromise;
    };

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



