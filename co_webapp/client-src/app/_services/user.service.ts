import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http, Headers, RequestOptions } from '@angular/http';
import { ErrorMngService } from "app/_services/errorMng.service";
import { CoGlobalsService } from "app/_services/coGlobals.service";

declare var google: any;


@Injectable()
export class UserService {
    private loggedIn = false;
    private logginInOccurring = false;

    constructor(private http: Http, private errorMngService: ErrorMngService, private coGlobalsService: CoGlobalsService) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
        
    private signinSuccessCB(resp) {
        this.logginInOccurring = false;
        if (resp.operationResult == true) {
            /* Store token in local storage, set global user data and set true to loggedIn variable */
            localStorage.setItem('auth_token', resp.resultData.token);
            this.coGlobalsService.setUserData(resp.resultData);
            this.loggedIn = true;
        } else {
            // use here the error msg service
            this.logout();
            this.errorMngService.showSystemError(resp.resultMessage);
        };
    };

    private signinErrorCB(err) {
        this.logginInOccurring = false;
        this.errorMngService.showSystemError(err.resultMessage);
    };

    optionallyFirstEuthenticate(authData, isLoggingIn, isRegitering) {
        if (this.loggedIn === true) {
            return Promise.resolve();
        };
        /* User is not logged in, then login or register */
        if (isLoggingIn === true) {
            return this.login(authData);
        } else if (isRegitering === true) {
            return this.signin(authData);
        };
    };

    login(loginData) {
        this.logginInOccurring = true;
        return this.http
            .post(
            '/login',
            JSON.stringify(loginData)
            )
            .map(res => res.json())
            .toPromise()
            .then((resp) => {
                this.signinErrorCB(resp);
            })
            .catch(err => {
                this.signinErrorCB(err);
            });
    }

    logout() {
        /* Clean local storage, clean global user data and set false to loggedIn variable */
        localStorage.removeItem('auth_token');
        this.coGlobalsService.setUserData(undefined);
        this.loggedIn = false;
    }

    signin(signinData) {
        this.logginInOccurring = true;
        return this.http
            .post(
            '/login',
            JSON.stringify(signinData)
            )
            .map(res => res.json())
            .toPromise()
            .then((resp) => {
                this.signinErrorCB(resp);
            })
            .catch(err => {
                this.signinErrorCB(err);
            });
    }

    isLoggedIn() {
        return this.loggedIn;
    }

}



