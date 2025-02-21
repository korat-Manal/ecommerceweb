import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      this.authenticatedSubject.next(true);
    }
  }

  login() {
      this.authenticatedSubject.next(true);
  }

  logout() {
    // Example logout logic
    localStorage.removeItem('currentUser');
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }
}
