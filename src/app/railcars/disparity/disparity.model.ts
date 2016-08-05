/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnprom.com
 * @date   22/06/2016 09:09
 */


/**
 * Representation interface for Disparity Data Model
 * 
 * @export 
 * @interface IDisparityModel
 */
export interface IDisparityModel {
    inventoryid?: string;

    ownername?: string;
    providername?: string;
    transportnumber?: number;
    sampleroutdate?: number;
    stationname?: string;
    cropfullname?: string;
    /**
     * Обнаружение несоответсвия на ИЗТ TIMESTAMP
     * @type {Date}
     */
    deviationtime?:         Date;
    
    /**
     * Причина задержки выгрузки вагона, VARCHAR(100)
     * 
     * @type {string}
     */
    deviationdescription?:  string;
    
 
    /**
     * Решение по ситуации, дата, время, TIMESTAMP
     * 
     * @type {Date}
     */
    permissiontime?:        Date;
    
    /**
     * Решение по ситуации, Ф,И,О, VARCHAR(50)
     * 
     * @type {string}
     */
    permissionusername?:    string;

    
    /**
     * Потверждение нестандартной ситуации - дата, время VARCHAR(50)
     * 
     * @type {Date}
     */
    confirmationtime?:      Date;

    /**
     * Потверждение нестандартной ситуации - Ф.И.О. VARCHAR(50)
     * 
     * @type {string}
     */
    confirmationusername? : string;

}

// export interface IDisparityAcceptModel {
//     id: string;
//     type: number;
//     text: string;
//     user: string;
//     date: string;
// }

