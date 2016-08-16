interface FiltersApiConfig {
    url: string,
    idValue: string,
    nameValue: string
}

export let SendersApi: FiltersApiConfig = {
    url: 'assets/api/clients/senders.json',
    idValue: 'clientid',
    nameValue: 'clientfullname'
}

export let OwnersApi: FiltersApiConfig = {
    url: 'assets/api/clients/owners.json',
    idValue: 'clientid',
    nameValue: 'clientfullname'
}

export let ProvidersApi: FiltersApiConfig = {
    url: 'assets/api/clients/providers.json',
    idValue: 'clientid',
    nameValue: 'clientfullname'
}

export let StationsApi: FiltersApiConfig = {
    url: 'assets/api/station.json',
    idValue: 'stationid',
    nameValue: 'stationname'
}

export let CulturesApi: FiltersApiConfig = {
    url: 'assets/api/crop.json',
    idValue: 'cropid',
    nameValue: 'cropname'
}

export let CulturesClassesApi: FiltersApiConfig = {
    url: 'assets/api/class.json',
    idValue: 'classid',
    nameValue: 'classname'
}

export let CulturesSortesApi: FiltersApiConfig = {
    url: 'assets/api/sort.json',
    idValue: 'sortid',
    nameValue: 'sortname'
}

export let StoragesApi: FiltersApiConfig = {
    url: 'assets/api/storage.json',
    idValue: 'storageid',
    nameValue: 'storagename'
}

export let ScalesTypeApi: FiltersApiConfig = {
    url: 'assets/api/scaletype.json',
    idValue: 'scaletypeid',
    nameValue: 'scaletypename'
}
