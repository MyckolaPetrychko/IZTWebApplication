"use strict";
var VisibilityConf = (function () {
    function VisibilityConf() {
        // this.showalarmed = false; // ??? only alarmed
        this.shownotreceived = false; // only не принятых железнодорожных вагонов 
        this.showweighted = true; // железнодорожных вагонов с определенной массой нетто.
        this.showremoterecords = true; // железнодорожных вагонов с оформленными актами возврата 
        this.showdeleted = true; // удаленных железнодорожных вагонов
        this.cols = {
            ownername: true,
            providername: true,
            transportnumber: true,
            invoicenumber: true,
            sampleroutdate: true,
            sendernname: true,
            stationname: true,
            cropfullname: true,
            gmopresence: true,
            certificatenumber: true,
            certificatedate: true,
            snnumber: true,
            invoicegross: true,
            invoicetare: true,
            invoicenet: true,
            deviationtime: true,
            taretime: true,
            gross: true,
            tare: true,
            net: true,
            grossdeficite: true,
            netdeficite: true,
            scaletypename: true,
            deviationdescription: true,
            permissiondescription: true,
            permissiontime: true,
            permissionusername: true,
            waitingtime: true,
            overtime: true,
            remark: false,
            grosstime: true,
            confirmationusername: true,
            confirmationtime: true,
            regdate: true //DATE
        };
    }
    return VisibilityConf;
}());
exports.VisibilityConf = VisibilityConf;

//# sourceMappingURL=view.model.js.map
