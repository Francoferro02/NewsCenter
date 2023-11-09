import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Comentario } from 'src/app/models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = 'http://localhost:3000/comentarios';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  deleteComment(commentId: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${commentId}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error al eliminar el comentario en el servidor JSON:', error);
        throw error;
      })
    );
  }
}