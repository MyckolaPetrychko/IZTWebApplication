export interface IAuthUser {
    id: number,
    username: string,
    password: string,
    role: string,
    
    firstName?: string,
    middleName?: string,
    secondName?: string,
    email?: string,
    phoneNumber?: string,
    clients?: Array<number>
}
