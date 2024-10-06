import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  constructor() { }

  private usuarios = [
    { username: 'admin', password: 'admin123' },
    // { username: 'user2', password: 'pass2' },
  ];

  private loggedIn = false;

  login(username: string, password: string): boolean {
    const usuarioValido = this.usuarios.find(
      (user) => user.username === username && user.password === password
    );
    if (usuarioValido) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
