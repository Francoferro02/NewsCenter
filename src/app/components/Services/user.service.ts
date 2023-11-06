import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})


export class UserService {
 private url = 'http://localhost:3000'
 private users: any[] = [];
 private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
 constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
    this.users = users;
  });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/users?signUpEmail=${email}&signUpPassword=${password}`)
      .pipe(
        map(users => users.length > 0 ? users[0] : null),
        tap(user => {
          if (user) {
            this.loggedInUserSubject.next(user);
          }
        })
      );
  }

  logoutUser(): void {
    this.loggedInUserSubject.next(null);
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }
}
