interface FiltersApiConfig {
    url: string,
    idValue: string,
    nameValue: string
}

export let SendersApi: FiltersApiConfig = {
    // url: 'assets/api/clients/senders.json',
    url: 'api/clients/senders',
    idValue: 'clientid',
    nameValue: 'clientfullname'
}

export let OwnersApi: FiltersApiConfig = {
    // url: 'assets/api/clients/owners.json',
    url: 'api/clients/owners',
    idValue: 'clientid',
    nameValue: 'clientfullname'
}

export let ProvidersApi: FiltersApiConfig = {
    // url: 'assets/api/clients/providers.json',
    url: 'api/clients/providers',
    idValue: 'clientid',
    nameValue: 'clientfullname'
}

export let StationsApi: FiltersApiConfig = {
    // url: 'assets/api/station.json',
    url: 'api/stations',
    idValue: 'stationid',
    nameValue: 'stationname'
}

export let CulturesApi: FiltersApiConfig = {
    // url: 'assets/api/crop.json',
    url: 'api/crop',
    idValue: 'cropid',
    nameValue: 'cropname'
}

export let CulturesClassesApi: FiltersApiConfig = {
    // url: 'assets/api/class.json',
    url: 'api/crop/%cultureID%/classes',
    idValue: 'id',
    nameValue: 'name'
}

export let CulturesSortesApi: FiltersApiConfig = {
    // url: 'assets/api/sort.json',
    url: 'api/crop/%cultureID%/sorts',
    idValue: 'id',
    nameValue: 'name'
}

export let StoragesApi: FiltersApiConfig = {
    // url: 'assets/api/storage.json',
    url: 'api/storage',
    idValue: 'id',
    nameValue: 'name'
}

export let ScalesTypeApi: FiltersApiConfig = {
    // url: 'assets/api/scaletype.json',
    url: 'api/scaletype',
    idValue: 'id',
    nameValue: 'name'
}
