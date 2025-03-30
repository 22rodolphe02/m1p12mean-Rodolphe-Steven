import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; // Import des opérateurs RxJS

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchRoles(): Observable<{ label: string; value: string }[]> {
    const url = `${this.apiUrl}/roles`;
    console.log('URL = ' + url);

    return this.http
      .get<{ success: boolean; data: { _id: string; nom: string }[] }>(url)
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            const roles = response.data.map((role) => ({
              label: role.nom,
              value: role._id,
            }));
            console.log('Rôles récupérés:', roles);
            return roles;
          } else {
            console.error('Réponse inattendue:', response);
            return [];
          }
        }),
        catchError((err) => {
          console.error('Erreur lors de la récupération des rôles:', err);
          return of([]); // Retourne un tableau vide en cas d'erreur
        })
      );
  }
}
