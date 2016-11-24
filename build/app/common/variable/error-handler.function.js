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
            case 401:
                message = 'CONNECTION.USER_NOT_AUTH';
                break;
            case 408:
            case 440:
                message = 'CONNECTION.USER_AUTH_TIMEOUT';
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
    return Observable_1.Observable.throw(message);
}
exports.handleError = handleError;

//# sourceMappingURL=error-handler.function.js.map
