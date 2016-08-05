export class VisibilityConf {

    // public showalarmed: boolean; // ??? alarmed
    public shownotreceived: boolean; // не принятых железнодорожных вагонов 
    public showweighted: boolean; // железнодорожных вагонов с определенной массой нетто.
    public showremoterecords: boolean; // железнодорожных вагонов с оформленными актами возврата 
    public showdeleted: boolean; // удаленных железнодорожных вагонов


    //ViewModel
    public cols: {
        ownername: boolean;  //Владелец  VARCHAR(100)
        providername: boolean;  //Поставщик VARCHAR(100)   
        transportnumber: boolean;  //Номер вагона  VARCHAR(31)    
        invoicenumber: boolean;  //Номер наклaдной VARCHAR(30)   
        sampleroutdate: boolean;   //Дата отгрузки DATE  
        sendernname: boolean;  //Экспедитор (отправитель) VARCHAR(100)    
        stationname: boolean;  //Станция VARCHAR(128)  
        cropfullname: boolean;  //Культура VARCHAR(100)
        gmopresence: boolean;  //Наличие ГМО VARCHAR(10) 
        certificatenumber: boolean;  //Сертификат качества INTEGER    
        certificatedate: boolean;   //Дата внесения сертификата качества    
        snnumber: boolean;  //Протокол безопасности VARCHAR(30)  
        invoicegross: boolean;  //Брутто по накладной, кг INTEGER
        invoicetare: boolean;  //Тара по накладной, кг INTEGER
        invoicenet: boolean;  //Нетто по накладной, кг INTEGER
        deviationtime: boolean;   //Обнаружение несоответсвия на ИЗТ TIMESTAMP
        taretime: boolean;    //Взешивание по таре   TIMESTAMP
        gross: boolean;  //Бруттто на ИЗТ, кг    INTEGER
        tare: boolean;  //Тара на изт, кг   INTEGER
        net: boolean;  //Нетто на ИЗТ, кг INTEGER
        grossdeficite: boolean;  //Разница по брутто, кг INTEGER
        netdeficite: boolean;  //Разница по нетто, кг, INTEGER
        scaletypename: boolean;  //Способ определения веса при отгрузке, VARCHAR(10)
        deviationdescription: boolean;  //Причина задержки выгрузки вагона, VARCHAR(100)
        permissiondescription: boolean;  //Решение по ситуации, решение, VARCHAR(100)
        permissiontime: boolean;    //Решение по ситуации, дата, время, TIMESTAMP
        permissionusername: boolean;  //Решение по ситуации, Ф,И,О, VARCHAR(50)
        overtime: boolean;    //Время доп. маневровых работ, TIMESTAMP

        // TODO:               RailcarModel | yet not nothing
        grosstime: boolean;   //Взвешивание по брутто TIMESTAMP
        remark: boolean;  //Примечание, VARCHAR(100)
        waitingtime: boolean;    //Время ожидания решения, TIME
        confirmationtime: boolean;    //TIMESTAMP
        confirmationusername: boolean;
        regdate: boolean;   //DATE
    }

    constructor() {

        // this.showalarmed = false; // ??? only alarmed
        this.shownotreceived = false;  // only не принятых железнодорожных вагонов 
        this.showweighted = true; // железнодорожных вагонов с определенной массой нетто.
        this.showremoterecords = true; // железнодорожных вагонов с оформленными актами возврата 
        this.showdeleted = true; // удаленных железнодорожных вагонов


        this.cols = {
            ownername: true,  //Владелец  VARCHAR(100)
            providername: true,  //Поставщик VARCHAR(100)   
            transportnumber: true,  //Номер вагона  VARCHAR(31)    
            invoicenumber: true,  //Номер наклaдной VARCHAR(30)   
            sampleroutdate: true,   //Дата отгрузки DATE  
            sendernname: true,  //Экспедитор (отправитель) VARCHAR(100)    
            stationname: true,  //Станция VARCHAR(128)  
            cropfullname: true,  //Культура VARCHAR(100)
            gmopresence: true,  //Наличие ГМО VARCHAR(10) 
            certificatenumber: true,  //Сертификат качества INTEGER    
            certificatedate: true,   //Дата внесения сертификата качества    
            snnumber: true,  //Протокол безопасности VARCHAR(30)  
            invoicegross: true,  //Брутто по накладной, кг INTEGER
            invoicetare: true,  //Тара по накладной, кг INTEGER
            invoicenet: true,  //Нетто по накладной, кг INTEGER
            deviationtime: true,   //Обнаружение несоответсвия на ИЗТ TIMESTAMP
            taretime: true,    //Взешивание по таре   TIMESTAMP
            gross: true,  //Бруттто на ИЗТ, кг    INTEGER
            tare: true,  //Тара на изт, кг   INTEGER
            net: true,  //Нетто на ИЗТ, кг INTEGER
            grossdeficite: true,  //Разница по брутто, кг INTEGER
            netdeficite: true,  //Разница по нетто, кг, INTEGER
            scaletypename: true,  //Способ определения веса при отгрузке, VARCHAR(10)
            deviationdescription: true,  //Причина задержки выгрузки вагона, VARCHAR(100)
            permissiondescription: true,  //Решение по ситуации, решение, VARCHAR(100)
            permissiontime: true,    //Решение по ситуации, дата, время, TIMESTAMP
            permissionusername: true,  //Решение по ситуации, Ф,И,О, VARCHAR(50)
            waitingtime: true,    //Время ожидания решения, TIME

            overtime: true,    //Время доп. маневровых работ, TIMESTAMP
            remark: false,  //Примечание, VARCHAR(100)
            grosstime: true,   //Взвешивание по брутто TIMESTAMP
            confirmationusername: true,
            confirmationtime: true,    //TIMESTAMP
            regdate: true  //DATE
        }
    }
}
