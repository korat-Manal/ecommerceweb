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

  //checks if the user is login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); 
  }
  login(token: string) {
      this.authenticatedSubject.next(true);
      localStorage.setItem('userToken', token);
  }

  logout() {
    // Example logout logic
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }
}
