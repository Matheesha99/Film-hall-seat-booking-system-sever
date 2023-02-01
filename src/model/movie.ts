import * as mongodb from "mongodb";

export interface Movie {
    name: string;
    language: string;
    price: number;
    year: string;
    url:string;
    category:string;
    _id?: mongodb.ObjectId;
 }