import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoggedIn = false;
  private loggedInUser: any | null = null;

  constructor(private router: Router) {
    
   }

  get isLoggedIn(): boolean {
    return this.LoggedIn;
  }

  send()
  {
    return this.loggedInUser;
  }
  get user(): any | null {
    return this.loggedInUser;
  }

  login(user: any) {
    this.LoggedIn = true;
    this.loggedInUser = user;
  }

  logout() {
    this.LoggedIn = false;
    this.loggedInUser = null;
   
  }

  isLoggedIns():boolean
  {
    return !! localStorage.getItem('token');
  }

}
