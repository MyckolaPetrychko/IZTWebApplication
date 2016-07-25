export interface FiltersApiConfig {
    url : string,
    filterValue: string
}


export let SendersApi : FiltersApiConfig   =  {
    url :  'assets/api/clients/senders.json',
    filterValue: 'clientfullname'
}

export let StationsApi : FiltersApiConfig   =  {
    url :  'assets/api/station.json',
    filterValue: 'stationname'
}

export let CulturesApi : FiltersApiConfig   =  {
    url :  'assets/api/crop.json',
    filterValue: 'cropname'
}

