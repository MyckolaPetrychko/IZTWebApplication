export interface IAuthUser {
    id: number,
    username: string,
    password?: string,
    role?: string,
    roles?: Array<string>,

    firstName?: string,
    lastName?: string,
    middleName?: string,
    email?: string,
    phoneNumber?: string,
    clients?: Array<number>
}
