export class COLS {
    showremoterecords: boolean;
    showactreturn: boolean;
    showweighted: boolean;
    shownotreceived: boolean;
    shownotallow: boolean;


    //ViewModel

    ownername:             boolean = true;  //Владелец  VARCHAR(100)
    providername:          boolean = true;  //Поставщик VARCHAR(100)   
    transportnumber:       boolean = true;  //Номер вагона  VARCHAR(31)    
    invoicenumber:         boolean = true;  //Номер наклaдной VARCHAR(30)   
    sampleroutdate:        boolean = true;   //Дата отгрузки DATE  
    sendernname:           boolean = true;  //Экспедитор (отправитель) VARCHAR(100)    
    stationname:           boolean = true;  //Станция VARCHAR(128)  
    cropfullname:          boolean = true;  //Культура VARCHAR(100)
    gmopresence:           boolean = true;  //Наличие ГМО VARCHAR(10) 
    certificatenumber:     boolean = true;  //Сертификат качества INTEGER    
    certificatedate:       boolean = true;   //Дата внесения сертификата качества    
    snnumber:              boolean = true;  //Протокол безопасности VARCHAR(30)  
    invoicegross:          boolean = true;  //Брутто по накладной, кг INTEGER
    invoicetare:           boolean = true;  //Тара по накладной, кг INTEGER
    invoicenet:            boolean = true;  //Нетто по накладной, кг INTEGER
    deviationtime:         boolean = true;   //Обнаружение несоответсвия на ИЗТ TIMESTAMP
    taretime:              boolean = true;    //Взешивание по таре   TIMESTAMP
    gross:                 boolean = true;  //Бруттто на ИЗТ, кг    INTEGER
    tare:                  boolean = true;  //Тара на изт, кг   INTEGER
    net:                   boolean = true;  //Нетто на ИЗТ, кг INTEGER
    grossdeficite:         boolean = true;  //Разница по брутто, кг INTEGER
    netdeficite:           boolean = true;  //Разница по нетто, кг, INTEGER
    scaletypename:         boolean = true;  //Способ определения веса при отгрузке, VARCHAR(10)
    deviationdescription:  boolean = true;  //Причина задержки выгрузки вагона, VARCHAR(100)
    permissiondescription: boolean = true;  //Решение по ситуации, решение, VARCHAR(100)
    permissiontime:        boolean = true;    //Решение по ситуации, дата, время, TIMESTAMP
    permissionusername:    boolean = true;  //Решение по ситуации, Ф,И,О, VARCHAR(50)
    remark:                boolean = true;  //Примечание, VARCHAR(100)
    waitingtime:           boolean = true;    //Время ожидания решения, TIME
    overtime:              boolean = true;    //Время доп. маневровых работ, TIMESTAMP

    // TODO:               RailcarModel | yet not nothing
    certificatepresence:   boolean = true;  //Наличие сертификата качества, VARCHAR(10)
    snpresence:            boolean = true;  //Наличие протокола безопасности,VARCHAR(10)
    grosstime:             boolean = true;   //Взвешивание по брутто TIMESTAMP

    confirmationtime:      boolean = true;    //TIMESTAMP
    inventoryid:           boolean = true;  //INTEGER
    regdate:               boolean = true;   //DATE
    invoiceid:             boolean = true;  //INTEGER
    ownerid:               boolean = true;  //INTEGER
    providerid:            boolean = true;  //INTEGER
    samplerqualityid:      boolean = true;  //INTEGER
    labqualityid:          boolean = true;  //INTEGER
    storageid:             boolean = true;  //INTEGER
    contractid:            boolean = true;  //INTEGER
    state:                 boolean = true;  //INTEGER
    senderqualityid:       boolean = true;  //INTEGER
    exporterid:            boolean = true;  //INTEGER
    stationid:             boolean = true;  //INTEGER
    senderid:              boolean = true;  //INTEGER
    cropid:                boolean = true;  //INTEGER

    constructor() {
        this.showremoterecords = false;
        this.showactreturn = false;
        this.showweighted = false;
        this.shownotreceived = false;
        this.shownotallow = false;
    }
}