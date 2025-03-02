import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { User } from '../models/user/user.model';

const API_URL = 'http://127.0.0.1:8000/api/users/'; // Assurez-vous que c'est l'URL de votre API Django

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile(): Observable<User> {
    return this.http.get<User>(API_URL + 'me/', this.getHeaders());
  }

  updateProfile(user: User): Observable<User> {
      // Assuming the API expects a PUT request to update the profile
      return this.http.put<User>(API_URL + 'me/', user, this.getHeaders());
  }

  deleteProfile(): Observable<any> {
    return this.http.delete(API_URL + 'me/', this.getHeaders());
  }

  private getHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    if (token) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    }
    return { headers: new HttpHeaders() };
  }
}