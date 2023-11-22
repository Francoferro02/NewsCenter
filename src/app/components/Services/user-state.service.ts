import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor() {}

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }
  getLoggedInUser(): Observable<User | null> {
    return this.loggedInUserSubject.asObservable();
  }
}
