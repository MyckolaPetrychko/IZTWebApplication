export interface IAuthUser {
    id: number,
    username: string,
    role?: string,
    roles: Array<string>,

    firstName?: string,
    middleName?: string,
    secondName?: string,
    email?: string,
    phoneNumber?: string,
    clients?: Array<number>
}
