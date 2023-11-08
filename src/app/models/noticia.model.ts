export class Comentario {
    text!: string;
    usuario!: string;
    editing!: boolean;
    urlNoticia!: string;
    id!:string;
  }
  export class Noticia {
      urlToImage!: string;
      title!: string;
      content!: string;
      comentario!: Comentario[];
      url!: string;
      rating: number = 0;
      CantidadCalificaciones : number = 0 ;
    }

  