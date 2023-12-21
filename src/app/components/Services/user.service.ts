import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from './auth-service.service';
import { UserStateService } from './user-state.service';
import { Noticia } from 'src/app/models/noticia.model';

@Injectable({
  providedIn: 'root'
})


export class UserService {
 private url = 'http://localhost:3000'
 private users: any[] = [];
 private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
 constructor(private http: HttpClient, private authService: AuthServiceService, private userStateService: UserStateService) {
  this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
    this.users = users;
    this.userStateService.setUsers(users); // Actualiza el estado local al obtener los usuarios
  });
}

deleteNewsFromUser(userId: number, newsId: string): Observable<void>  {
  const url = `${this.url}/users/${userId}`;
  
  return this.http.get<any>(url).pipe(
    switchMap(user => {
      if (user && user.savedNews) {
        // Filtrar las noticias que no coincidan con la que se va a borrar en el array local
        const updatedNews = user.savedNews.filter((news: Noticia) => news.title !== newsId);

        // Actualizar el usuario localmente
        const updatedUser = { ...user, savedNews: updatedNews };

        // Realizar la solicitud PUT al servidor para actualizar las noticias
        return this.http.put<void>(url, updatedUser);
      } else {
        return throwError('Usuario no encontrado o sin noticias guardadas.');
      }
    }),
    catchError(error => throwError('Error al obtener el usuario: ' + error))
  );
}

createUser(user: any): Observable<any> {
  user.join = new Date().toLocaleDateString();
  user.img = new String;
  return this.http.post(`${this.url}/users`, user).pipe(
    tap((createdUser) => {
      const currentUsers = this.users.slice(); // Copia los usuarios actuales
      currentUsers.push(createdUser);
      this.users = currentUsers;
      this.userStateService.setUsers(currentUsers); // Actualiza el estado local al crear un nuevo usuario
    })
  );
}


  
  loginUser(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.url}/users?email=${email}&password=${password}`)
      .pipe(
        map(users => users.length > 0 ? users[0] : null),
        switchMap(user => {
          if (user) {
            this.loggedInUserSubject.next(user);
            return of(user);
          } else {
            return throwError('Credenciales inválidas');
          }
        })
      );
  }
  

  logoutUser(): void {
    this.loggedInUserSubject.next(null);
    this.authService.desAutenticar();
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }

  deleteUser(id:number): Observable<any> {
     return this.http.delete<any[]>(`${this.url}/users/${id}`);
  }

  updateUser(user: any): Observable<any> {
    const userId = user.id;
    return this.http.put(`${this.url}/users/${userId}`, user).pipe(
      tap(() => {
        const currentUsers = this.users.slice();
        const userIndex = currentUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          currentUsers[userIndex] = user;
          this.users = currentUsers;
          this.userStateService.setUsers(currentUsers);
        
           this.loggedInUserSubject.next(user); 
          /* this.loggedInUserSubject.next({ ...this.loggedInUserSubject.value, img: user.img }); */
        }
      })
    );
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }
}


