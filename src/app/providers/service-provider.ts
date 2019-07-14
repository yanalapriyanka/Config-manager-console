import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CustomHeader } from '../models/custom-http-header.model';
import {ConfigConstants} from '../common/app-config-constants';
import { Utility } from '../common/utility';

@Injectable()
export class ServiceProvider {
    constructor(public router: Router, public http:HttpClient, public utility:Utility){

    }
    baseApi='v1';
    /**
     * Implementing the getRequestheaders method of the interface
     */
    getRequestHeaders(httpHeader?: CustomHeader[], isFormPost?: boolean) {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        if (!isFormPost) {
            headers = headers.set('Content-Type', 'application/json');
        }
        headers = headers.set('Access-Control-Allow-Origin', '*');

        if (httpHeader && httpHeader.length) {
            httpHeader.forEach(element => {
                headers = headers.set(element.key, element.Value)
            });
        }
        return headers;
    }
    /**
    * Implementing the getRequestheaders method of the interface
    */
    public getBaseUrl(): string {
        return ConfigConstants.APIUrl;
    }

    /**
     * custom post implementation
     * @param url 
     * @param body 
     */
    public post(url: string, body?: any, httpHeader?: CustomHeader[]): Observable<object> {
        return this.http.post(this.getBaseUrl() + this.baseApi + url, body, { headers: this.getRequestHeaders(httpHeader) });
    }

    /**
  * custom post implementation
  * @param url 
  * @param body 
  */
    public postFormData(url: string, body?: any, httpHeader?: CustomHeader[]): Observable<object> {
        return this.http.post(this.getBaseUrl() + this.baseApi + url, body, { headers: this.getRequestHeaders(httpHeader,true) });
    }
    /**
     * customer get implementation
     * @param url 
     */
    public get(url: string, httpHeader?: CustomHeader[]): Observable<object> {
        return this.http.get(this.getBaseUrl() + this.baseApi + url, { headers: this.getRequestHeaders(httpHeader) })
    }
    /**
     * customer put implementation
     * @param url 
     * @param body 
     */
    public put(url: string, body?: any, httpHeader?: CustomHeader[]): Observable<object> {
        return this.http.put(this.getBaseUrl() + this.baseApi + url, body, { headers: this.getRequestHeaders(httpHeader) });
    }
    /**
     * custom delete Impletataion
     * @param url 
     * @param body 
     */
    public delete(url: string, body?: any, httpHeader?: CustomHeader[]): Observable<object> {
        return this.http.delete(this.getBaseUrl() + this.baseApi + url, { headers: this.getRequestHeaders(httpHeader) });
    }

}