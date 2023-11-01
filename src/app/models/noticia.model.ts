export class Comentario {
    text!: string;
    usuario!: string;
    editing!: boolean;
  }
export class Noticia {
    urlToImage!: string;
    title!: string;
    content!: string;
    comentario!: Comentario[];
  }

 