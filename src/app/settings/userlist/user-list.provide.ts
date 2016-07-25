import { Http }           from '@angular/http';
import { provide }        from '@angular/core';


import { UserService } from './user-list.service';
import { UserFactory } from './user-list.factory';


export let UserProvide = provide(
    UserService,
    {
        useFactory: UserFactory,
        deps:       [Http]
    }
);