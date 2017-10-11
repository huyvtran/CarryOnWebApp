import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ROUTES } from '../sidebar/sidebar-routes.config';

declare var google: any;


@Injectable()
export class CoGlobalsService {
    public userData: any;

    constructor(private http: Http) { }
    
    /* Debug */ 
    //public appUrl = 'http://localhost:57493/';
    /* Azure */ 
    public appUrl = 'http://carryonwebapi.azurewebsites.net/';

    public getAppUrl() {
        return this.appUrl;
    };

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


    /* User related data */
    setUserData(_userData) {
        this.userData = _userData;
    }

}



