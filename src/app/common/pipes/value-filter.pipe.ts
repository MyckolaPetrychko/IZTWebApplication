import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'valueFilter'
})

@Injectable()
export class ValueFilterPipe implements PipeTransform {
    transform(items: any[], args: string[]): any[] {
        if (args[0]) {
            let returned: string[];
            returned = items.filter(item => item.indexOf(args[0]) !== -1);
            return returned;
        } else {
            return items;
        }
    }
}
