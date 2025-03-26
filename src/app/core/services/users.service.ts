import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signUp(
    nom: string,
    prenom: string,
    email: string,
    numero: string,
    motdepasse: string,
    role: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, {
      nom,
      prenom,
      email,
      numero,
      motdepasse,
      role,
    });
  }
}
