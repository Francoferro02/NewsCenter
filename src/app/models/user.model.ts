import { Noticia } from "./noticia.model";

export class User  {
    id!: number;
    name!:  string;
    surname!: string;
    email!: string;
    password!: string;
    location!: string;
    join!: Date;
    rolbio! : string;
    savedNews! : Noticia[];
    img!: string;
}