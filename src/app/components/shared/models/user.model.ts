import { role } from "./role.model";

export interface user { 
    id:number;
    fullName:string;
    username:string;
    Email:string;
    role:role;
    Password:string;
}