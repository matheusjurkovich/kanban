import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public isLoggedIn(): boolean {
   
    return !!localStorage.getItem('token');
  }

  public login(username: string, password: string): void {
    
  }
}
