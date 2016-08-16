/**
 * @author Maryna Usatiuk 
 * @email maryna.duda@innovinnprom.com
 * @date 01.08.2016 11:39:44
 */

/**
 * Interface by IRailcarDisparityModel 
 * 
 * @export
 * @interface IRailcarDisparityModel
 */
export interface IRailcarDisparityModel {
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
    // deviationtime?:         Date;    //Обнаружение несоответсвия на ИЗТ TIMESTAMP
    // deviationdescription?:  string;  //Причина задержки выгрузки вагона, VARCHAR(100)
    // permissiondescription?: string;  //Решение по ситуации, решение, VARCHAR(100)
    // permissiontime?:        Date;    //Решение по ситуации, дата, время, TIMESTAMP
    // permissionusername?:    string;  //Решение по ситуации, Ф,И,О, VARCHAR(50)
    // confirmationtime?:      Date;    // підтвердження час TIMESTAMP
    // confirmationusername? : string; // підтвердження назва користувача
