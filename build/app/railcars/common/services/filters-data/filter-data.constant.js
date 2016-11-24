"use strict";
exports.SendersApi = {
    // url: 'assets/api/clients/senders.json',
    url: 'api/clients/senders',
    idValue: 'clientid',
    nameValue: 'clientfullname'
};
exports.OwnersApi = {
    url: 'assets/api/clients/owners.json',
    // url: 'api/clients/owners',
    idValue: 'clientid',
    nameValue: 'clientfullname'
};
exports.ProvidersApi = {
    // url: 'assets/api/clients/providers.json',
    url: 'api/clients/providers',
    idValue: 'clientid',
    nameValue: 'clientfullname'
};
exports.StationsApi = {
    // url: 'assets/api/station.json',
    url: 'api/stations',
    idValue: 'stationid',
    nameValue: 'stationfullname'
};
exports.CulturesApi = {
    // url: 'assets/api/crop.json',
    url: 'api/crop',
    idValue: 'cropid',
    nameValue: 'cropname'
};
exports.CulturesClassesApi = {
    // url: 'assets/api/class.json',
    url: 'api/crop/%cultureID%/classes',
    idValue: 'id',
    nameValue: 'name'
};
exports.CulturesSortesApi = {
    // url: 'assets/api/sort.json',
    url: 'api/crop/%cultureID%/sorts',
    idValue: 'id',
    nameValue: 'name'
};
exports.StoragesApi = {
    // url: 'assets/api/storage.json',
    url: 'api/storage',
    idValue: 'id',
    nameValue: 'name'
};
exports.ScalesTypeApi = {
    // url: 'assets/api/scaletype.json',
    url: 'api/scaletype',
    idValue: 'id',
    nameValue: 'name'
};

//# sourceMappingURL=filter-data.constant.js.map
