import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'valueFilter'
})

@Injectable()
export class ValueFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        if (args[0]) {
            let returned : string[];
            returned = items.filter(item => item.indexOf(args[0]) !== -1);
            if (returned.length > 0) {
	      return returned;
            } else {
	      return ['No data present'];
            }
        } else {
            return items;
        }
    }
}
