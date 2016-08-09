import {Injectable, Pipe, PipeTransform} from '@angular/core';

import { IDataModel } from '../../filters-data/data.model';
@Pipe({
    name: 'dataFilter'
})

@Injectable()
export class DataFilterPipe implements PipeTransform {
    /**
     * Pipes for filter data for property and value
     * @example " items | dataFilter :value :property "
     * @param {IDataModel[]} items List of data
     * @param {string} value    Value for filter
     * @param {string} prop = 'id'     Property name for filtering. Default id
     * @param {string[]} args   Other values
     * @returns {IDataModel[]}  data filtered
     */
    transform(items: IDataModel[], value: string, prop: string = 'id', args: string[]): IDataModel[] {
        if (value) {
            let returned: IDataModel[];
            returned = items.filter((item: IDataModel): boolean => {
                return (('' + item[prop]).indexOf(value) !== -1);
            }); 
            return returned;
        } else {
            return items;
        }
    }
}
