export interface Address{
    state: string,
    postalcode: number
}
export interface User{
    id: number,
    firstName:string,
    lastName:string,
    address: Address
}