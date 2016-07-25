import { UserService } from './user-list.service';
import { Http }           from '@angular/http';

export let UserFactory = (http: Http) => {
    return new UserService(http);
}