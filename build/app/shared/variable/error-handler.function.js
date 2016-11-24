"use strict";
var Observable_1 = require('rxjs/Observable');
function handleError(err) {
    var message = 'CONNECTION.SERVER_CONNECTION_ERROR';
    if (!err.ok) {
        switch (err.status) {
            case 400:
                message = 'CONNECTION.BAD_REQUEST';
                break;
            case 404:
                message = 'CONNECTION.NOT_FOUND';
                break;
            case 403:
                message = 'CONNECTION.PERMISSION_DENNIED';
                break;
            case 401:
                message = 'CONNECTION.USER_NOT_AUTH';
                window.location.href = '#/login;message=' + message;
                break;
            case 408:
            case 440:
                message = 'CONNECTION.USER_AUTH_TIMEOUT';
                window.location.href = '#/login;message=' + message;
                break;
            case 409:
                message = 'CONNECTION.CONFLICT_ERROR';
                break;
            case 500:
                message = 'CONNECTION.SERVER_INTERNAL_ERROR';
                break;
            case 502:
                message = 'CONNECTION.BAD_GATEWAY';
                break;
            default:
                message = err.statusText;
                break;
        }
    }
    console.error(err.url + '\nStatus:' + err.status + '\n Message:' + message);
    return Observable_1.Observable.throw(message);
}
exports.handleError = handleError;

//# sourceMappingURL=error-handler.function.js.map
