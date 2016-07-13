/**
 * @author Maryna Duda 
 * @email maryna.duda@innovinnprom.com
 * @date 23.06.2016 10:    50:                                        10
 */

/**
 * Interface by RailcarModelInterface 
 * 
 * @export
 * @interface RailcarInterface
 */
export interface IRailcarModel {
    /**
     * Владелец  VARCHAR(100)
     * 
     * @type {string}
     */
    ownername?:             string;  //Владелец  VARCHAR(100)

    /**
     * Поставщик VARCHAR(100)
     * 
     * @type {string}
     */
    providername?:          string;  //Поставщик VARCHAR(100)
    
    /**
     * Номер вагона  VARCHAR(31)
     * 
     * @type {string}
     */
    transportnumber?:       string;  //Номер вагона  VARCHAR(31)
    
    /**
     * Номер наклaдной VARCHAR(30)
     * 
     * @type {string}
     */
    invoicenumber?:         string;  //Номер наклaдной VARCHAR(30)
    
    /**
     * Дата отгрузки DATE
     * 
     * @type {Date}
     */
    sampleroutdate?:        Date;    //Дата отгрузки DATE
    
    /**
     * Экспедитор (отправитель) VARCHAR(100)
     * 
     * @type {string}
     */
    sendernname?:           string;  //Экспедитор (отправитель) VARCHAR(100)
    
    /**
     * Станция VARCHAR(128)
     * 
     * @type {string}
     */
    stationname?:           string;  //Станция VARCHAR(128)
   
    /**
     * Культура (full name)VARCHAR(100)
     * 
     * @type {string}
     */
    cropfullname?:          string;  //Культура VARCHAR(100)

    /**
     * Наличие ГМО VARCHAR(10)   
     * TODO:               RailcarModel | check for type gmopresence: string; //Наличие ГМО 
     * 
     * @type {string}
     */
    gmopresence?:           string;  //Наличие ГМО VARCHAR(10)   
   
    /**
     * Сертификат качества INTEGER
     * 
     * @type {number}
     */
    certificatenumber?:     number;  //Сертификат качества INTEGER
    
    /**
     * Дата внесения сертификата качества 
     * 
     * @type {Date}
     */
    certificatedate?:       Date;    //Дата внесения сертификата качества 
    
    /**
     * Протокол безопасности VARCHAR(30)
     * 
     * @type {string}
     */
    snnumber?:              string;  //Протокол безопасности VARCHAR(30)
    
    /**
     * Брутто по накладной, кг INTEGER
     * 
     * @type {number}
     */
    invoicegross?:          number;  //Брутто по накладной, кг INTEGER
    
    /**
     * Тара по накладной, кг INTEGER
     * 
     * @type {number}
     */
    invoicetare?:           number;  //Тара по накладной, кг INTEGER
    
    /**
     * Нетто по накладной, кг INTEGER
     * 
     * @type {number}
     */
    invoicenet?:            number;  //Нетто по накладной, кг INTEGER


    /**
     * Обнаружение несоответсвия на ИЗТ TIMESTAMP
     * TODO:               RailcarModel | check deviationtime:        Date;//Обнаружение несоответсвия на ИЗТ
     * 
     * @type {Date}
     */
    deviationtime?:         Date;    //Обнаружение несоответсвия на ИЗТ TIMESTAMP
    
    /**
     * Взешивание по таре   TIMESTAMP
     * 
     * @type {Date}
     */
    taretime?:              Date;    //Взешивание по таре   TIMESTAMP
    
    /**
     * Бруттто на ИЗТ, кг    INTEGER
     * 
     * @type {number}
     */
    gross?:                 number;  //Бруттто на ИЗТ, кг    INTEGER
    
    /**
     * Тара на изт, кг   INTEGER
     * 
     * @type {number}
     */
    tare?:                  number;  //Тара на изт, кг   INTEGER
    
    /**
     * Нетто на ИЗТ, кг INTEGER
     * 
     * @type {number}
     */
    net?:                   number;  //Нетто на ИЗТ, кг INTEGER
    
    /**
     * Разница по брутто, кг INTEGER
     * 
     * @type {number}
     */
    grossdeficite?:         number;  //Разница по брутто, кг INTEGER
    
    /**
     * Разница по нетто, кг, INTEGER
     * 
     * @type {number}
     */
    netdeficite?:           number;  //Разница по нетто, кг, INTEGER
    
    /**
     * Способ определения веса при отгрузке, VARCHAR(10)
     * 
     * @type {string}
     */
    scaletypename?:         string;  //Способ определения веса при отгрузке, VARCHAR(10)

    /**
     * Причина задержки выгрузки вагона, VARCHAR(100)
     * 
     * @type {string}
     */
    deviationdescription?:  string;  //Причина задержки выгрузки вагона, VARCHAR(100)
    
    /**
     * Решение по ситуации, решение, VARCHAR(100)
     * 
     * @type {string}
     */
    permissiondescription?: string;  //Решение по ситуации, решение, VARCHAR(100)
    
    /**
     * Решение по ситуации, дата, время, TIMESTAMP
     * 
     * @type {Date}
     */
    permissiontime?:        Date;    //Решение по ситуации, дата, время, TIMESTAMP
    
    /**
     * Решение по ситуации, Ф,И,О, VARCHAR(50)
     * 
     * @type {string}
     */
    permissionusername?:    string;  //Решение по ситуации, Ф,И,О, VARCHAR(50)

    /**
     * Примечание, VARCHAR(100)
     * 
     * @type {string}
     */
    remark?:                string;  //Примечание, VARCHAR(100)
    
    /**
     * Время ожидания решения, TIME
     * 
     * @type {Date}
     */
    waitingtime?:           Date;    //Время ожидания решения, TIME
    
    /**
     * Время доп. маневровых работ, TIMESTAMP
     * 
     * @type {Date}
     */
    overtime?:              Date;    //Время доп. маневровых работ, TIMESTAMP

    // TODO:               RailcarModel | yet not nothing
    certificatepresence?:   string;  //Наличие сертификата качества, VARCHAR(10)
    snpresence?:            string;  //Наличие протокола безопасности,VARCHAR(10)

    confirmationtime?:      Date;    //TIMESTAMP
    inventoryid?:           number;  //INTEGER
    regdate?:               Date;    //DATE
    invoiceid?:             number;  //INTEGER
    grosstime?:             Date;    //TIMESTAMP
    ownerid?:               number;  //INTEGER
    providerid?:            number;  //INTEGER
    samplerqualityid?:      number;  //INTEGER
    labqualityid?:          number;  //INTEGER
    storageid?:             number;  //INTEGER
    contractid?:            number;  //INTEGER
    state?:                 number;  //INTEGER
    senderqualityid?:       number;  //INTEGER
    exporterid?:            number;  //INTEGER
    stationid?:             number;  //INTEGER
    senderid?:              number;  //INTEGER
    cropid?:                number;  //INTEGER
} 

/*
export interface IRailcarModel {
    ownername?:             string;  //Владелец  VARCHAR(100)
    providername?:          string;  //Поставщик VARCHAR(100)   
    transportnumber?:       string;  //Номер вагона  VARCHAR(31)    
    invoicenumber?:         string;  //Номер наклaдной VARCHAR(30)   
    sampleroutdate?:        Date;    //Дата отгрузки DATE  
    sendernname?:           string;  //Экспедитор (отправитель) VARCHAR(100)    
    stationname?:           string;  //Станция VARCHAR(128)  
    cropfullname?:          string;  //Культура VARCHAR(100)
    gmopresence?:           string;  //Наличие ГМО VARCHAR(10) 
    certificatenumber?:     number;  //Сертификат качества INTEGER    
    certificatedate?:       Date;    //Дата внесения сертификата качества    
    snnumber?:              string;  //Протокол безопасности VARCHAR(30)  
    invoicegross?:          number;  //Брутто по накладной, кг INTEGER
    invoicetare?:           number;  //Тара по накладной, кг INTEGER
    invoicenet?:            number;  //Нетто по накладной, кг INTEGER
    deviationtime?:         Date;    //Обнаружение несоответсвия на ИЗТ TIMESTAMP
    taretime?:              Date;    //Взешивание по таре   TIMESTAMP
    gross?:                 number;  //Бруттто на ИЗТ, кг    INTEGER
    tare?:                  number;  //Тара на изт, кг   INTEGER
    net?:                   number;  //Нетто на ИЗТ, кг INTEGER
    grossdeficite?:         number;  //Разница по брутто, кг INTEGER
    netdeficite?:           number;  //Разница по нетто, кг, INTEGER
    scaletypename?:         string;  //Способ определения веса при отгрузке, VARCHAR(10)
    deviationdescription?:  string;  //Причина задержки выгрузки вагона, VARCHAR(100)
    permissiondescription?: string;  //Решение по ситуации, решение, VARCHAR(100)
    permissiontime?:        Date;    //Решение по ситуации, дата, время, TIMESTAMP
    permissionusername?:    string;  //Решение по ситуации, Ф,И,О, VARCHAR(50)
    remark?:                string;  //Примечание, VARCHAR(100)
    waitingtime?:           Date;    //Время ожидания решения, TIME
    overtime?:              Date;    //Время доп. маневровых работ, TIMESTAMP

    // TODO:               RailcarModel | yet not nothing
    certificatepresence?:   string;  //Наличие сертификата качества, VARCHAR(10)
    snpresence?:            string;  //Наличие протокола безопасности,VARCHAR(10)
    grosstime?:             Date;    //Взвешивание по брутто TIMESTAMP


    confirmationtime?:      Date;    //TIMESTAMP
    inventoryid?:           number;  //INTEGER
    regdate?:               Date;    //DATE
    invoiceid?:             number;  //INTEGER
    ownerid?:               number;  //INTEGER
    providerid?:            number;  //INTEGER
    samplerqualityid?:      number;  //INTEGER
    labqualityid?:          number;  //INTEGER
    storageid?:             number;  //INTEGER
    contractid?:            number;  //INTEGER
    state?:                 number;  //INTEGER
    senderqualityid?:       number;  //INTEGER
    exporterid?:            number;  //INTEGER
    stationid?:             number;  //INTEGER
    senderid?:              number;  //INTEGER
    cropid?:                number;  //INTEGER
} 
 */

