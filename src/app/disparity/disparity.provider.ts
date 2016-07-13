/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnprom.com
 * @date  08.07.2016 15:34:36
 */

import { DisparityService } from './disparity.service';
import { DisparityFactory } from './disparity.factory';

// import { UserServiceClass }   from '../user/service';
import { Http }               from '@angular/http';
import { provide } from '@angular/core';




export let DisparityProvide =
    provide(DisparityService, {
        useFactory: DisparityFactory,
        deps: [Http]
    });
