export interface IUser{
    name:string,
    uniqueSchId:number,
    password:string,
    address:[
        {
            street:string,
            zipcode:number,
        }
    ],
    state:string,
    city:string,
    filePath:string,
    role:string,
}