import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const API_URL = 'http://127.0.0.1:8000/api/'; // Assurez-vous que c'est l'URL de votre API Django

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // login(credentials: any): Observable<any> {
  //   return this.http.post(API_URL + 'token/', credentials);
  // }

  login(credentials: any): Observable<any> {
    return this.http.post(API_URL + 'users/login/', credentials);
  }
  register(user: any): Observable<any> {
    return this.http.post(API_URL + 'users/register/', user);
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      return jwtHelper.decodeToken(token);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Retourne true si le token existe, false sinon
  }
  
  getCurrentUser(): any {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? { username: decodedToken.username, role: decodedToken.role, userId: decodedToken.user_id} : null;
  }

}