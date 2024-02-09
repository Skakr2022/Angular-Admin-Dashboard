import { role } from "./role.model";

export interface user { 
    id?:number;
    firstName?:string;
    lastName?:string;
    username?:string;
    Email?:string;
    role?:role;
    Password?:string;
}