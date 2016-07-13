/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnprom.com
 * @date   22/06/2016 10:50
 */

// service
import { DisparityService } from './disparity.service';
// import { UserServiceClass }   from '../user/service';
import { Http }               from '@angular/http';

// factory to create service
export let DisparityFactory = (http: Http) => {
  return new DisparityService(http);
}
