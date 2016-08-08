/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnprom.com
 * @date 23.06.2016 10:    50:                                        10
 */


export interface IRaicarEditModel {

    /**
     * Номер вагона  VARCHAR(31)
     * 
     * @type {string}
     */
    transportnumber: string;  //Номер вагона  VARCHAR(31)

    /**
     * Дата отгрузки DATE
     * 
     * @type {Date}
     */
    sampleroutdate?: Date;    //Дата отгрузки DATE

    /**
     * Номер наклaдной VARCHAR(30)
     * 
     * @type {string}
     */
    invoicenumber?: string;  //Номер наклaдной VARCHAR(30)

    /**
     * Дата наклaдной DATE
     * 
     * @type {string}
     */
    invoicedate?: Date;  //Номер наклaдной VARCHAR(30)

    /**
     * Владелец  VARCHAR(100)
     * 
     * @type {string}
     */
    ownername?: string;  //Владелец  VARCHAR(100)
    ownerid?: number;  //INTEGER

    /**
     * Поставщик VARCHAR(100)
     * 
     * @type {string}
     */
    providername?: string;  //Поставщик VARCHAR(100)
    providerid?: number;  //INTEGER

    /**
     * Экспедитор (отправитель) VARCHAR(100)
     * 
     * @type {string}
     */
    sendernname?: string;  //Экспедитор (отправитель) VARCHAR(100)
    senderid?: number;  //INTEGER

    /**
     * Станция VARCHAR(128)
     * 
     * @type {string}
     */
    stationname?: string;  //Станция VARCHAR(128)
    stationid?: number;  //INTEGER


    /**
     * contractnumber - Номер контракта
     * 
     * @type {number}
     */
    contractid?: number;  //INTEGER ,,,
    contractnumber?: number;  //INTEGER


    storageid?: number;  //INTEGER
    storagename?: string;  //INTEGER

    cropid?: number;  //INTEGER
    cropname?: string;  //INTEGER

    classid?: number;  //INTEGER
    classname?: string;  //INTEGER

    sortid?: number;  //INTEGER
    sortname?: string;  //INTEGER

    /**
     * Способ определения веса при отгрузке, VARCHAR(10)
     * 
     * @type {string}
     */
    scaletypename?: string;  //Способ определения веса при отгрузке, VARCHAR(10)
    scaletypeid: number;

    /**
     * Наличие ГМО VARCHAR(10)   
     * TODO:               RailcarModel | check for type gmopresence: string; //Наличие ГМО 
     * 
     * @type {string}
     */
    gmopresence?: string;  //Наличие ГМО VARCHAR(10)   


    /**
     * Брутто по накладной, кг INTEGER
     * 
     * @type {number}
     */
    invoicegross?: number;  //Брутто по накладной, кг INTEGER

    /**
     * Тара по накладной, кг INTEGER
     * 
     * @type {number}
     */
    invoicetare?: number;  //Тара по накладной, кг INTEGER

    /**
     * Нетто по накладной, кг INTEGER
     * 
     * @type {number}
     */
    invoicenet?: number;  //Нетто по накладной, кг INTEGER

    inventoryid?: number;  //INTEGER
    regdate?: Date;    //DATE
    state?: number;  //INTEGER
} 
