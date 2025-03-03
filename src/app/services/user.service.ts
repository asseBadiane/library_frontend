import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register/`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials);
  }


  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me/`,
    { headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }) }

    ).pipe(
      // tap(response => console.log('Réponse API brute:', response)),
      map(user => {
        // Si nécessaire, transformez les données ici pour correspondre à votre interface User
        return user;
      })
    );
  }

  // Méthode unifiée qui gère les deux cas (avec ou sans image)
  updateProfile(data: User | FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    
    return this.http.patch(`${this.apiUrl}/me/`, data, { headers });
  }

  updateProfileWithImage(formData: FormData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me/`, formData);
  }

  deleteProfile(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/me/`);
  }
}