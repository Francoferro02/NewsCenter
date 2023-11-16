import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})


export class UserService {
 private url = 'http://localhost:3000'
 private users: any[] = [];
 private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
 constructor(private http: HttpClient, private authService: AuthServiceService) {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
    this.users = users;
  });
  }

  createUser(user: any): Observable<any> {
    user.join = new Date().toLocaleDateString();
    user.img = new String
    return this.http.post(`${this.url}/users`, user);
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

  updateUser(user:any): Observable<any>{
    const userId = user.id; // Asume que el usuario tiene un campo 'id'
    return this.http.put(`${this.url}/users/${userId}`, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }
}


