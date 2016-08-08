/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnpromm.com
 * @date 23.06.2016 11:38:31
 */

// TODO: RailcarProvide | add parametr to service

import { Http }           from '@angular/http';
import { provide }        from '@angular/core';


import { RailcarService } from './railcars.service';
import { RailcarFactory } from './railcars.factory';
import { AuthService } from '../user/auth.service';


/**
  *  Provider to service by railcar, 
  *  factory: RailcarFactory - factory by create service
  *  depensiens: Http - angular2 http module
  *
  * @export RailcarProvide
  * @param {Provider} RailcarProvide  - provide for RailcarService
  */

export let RailcarProvide = provide(
    RailcarService,
    {
        useFactory: RailcarFactory,
        deps:       [Http, AuthService]
    }
);
