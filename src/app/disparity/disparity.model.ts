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
    id: string;
    type: number;
    proprietor: string;
    supplier: string;
    carloadNumber: number;
    shimpentDate: number;
    station: string;
    culture: string;
    reasonText: string;
    reasonDate: string;
}

export interface IDisparityAcceptModel {
    id: string;
    type: number;
    text: string;
    user: string;
    date: string;
}
