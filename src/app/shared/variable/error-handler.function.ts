import {
    Http,
    Response,
} from '@angular/http';
import { Inject } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export function handleError(err: Response): Observable<string> {
    let message: string = 'CONNECTION.SERVER_CONNECTION_ERROR';
    // @Inject('Router')router :  Router;
    if (!err.ok) {
        switch (err.status) {
            case 400:
                message = 'CONNECTION.BAD_REQUEST';
                break;
            case 404:
                message = 'CONNECTION.NOT_FOUND';
                break;
            case 403:
            case 401:
                message = 'CONNECTION.USER_NOT_AUTH';
                // _router.navigate(['/login', { message: message }]);
                break;
            case 408:
            case 440:
                message = 'CONNECTION.USER_AUTH_TIMEOUT';
                // _router.navigate(['/login', { message: message }]);
                break;
            case 409:
                message = 'CONNECTION.CONFLICT_ERROR';
                break;
            default:
                message = err.statusText;
                break;
        }
    }
    console.error(err.url + '\nStatus:' + err.status + '\n Message:' + message);
    return Observable.throw(message);
}
