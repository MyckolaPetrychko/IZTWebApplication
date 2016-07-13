/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnpromm.com
 * @date 23.06.2016 11:38:31
 */

// TODO: RailcarFactory | add parametr to service

import { RailcarService } from './railcars.service';
import { Http }           from '@angular/http';

/**
  * Factory to create service by railcar
  * 
  * @export RailcarFactory
  * @param {Http} http      - angular2 http module 
  * @returns RailcarService - service by work with railcars
  */
export let RailcarFactory = (http: Http) => {
    return new RailcarService(http);
}
