export interface User {
    _id: string,
    name:  string,
    surname: string,
    phone: string,
    email: string,
    confirmed: Boolean,
    secretToken: string,
    password: string,

}
export interface Transporter {
    _id: string,
    name:  string,
    surname: string,
    phone: string,
    email: string,
    image: string,
    confirmed: Boolean,
    secretToken: string,
    password: string,
    document: string
}
export interface Order{
    _id: string,
    startCity: string,
    endCity: string,
    startAdress: string,
    endAdress: string,
    clientName: string,
    clientPhone: string,
    type: string,
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    status: string,
    user: string,
    dateEnd: string,
    dateStart: string,
    transporter?: string,
    orderNum: string,
    price: string,
    transporterName: string,
    transporterPhone: string,


}
export interface City {

    name: string,
    oblast: string
}
export interface Admin {
    login: string,
    password: string
}
