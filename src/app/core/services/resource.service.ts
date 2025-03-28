import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../models/response.model';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T, C = T> {

  protected apiUrl!: string;

  constructor(protected http: HttpClient) {}

  // Méthode pour configurer l'URL de l'API
  setApiUrl(apiUrl: string): void {
    this.apiUrl = `${environment.apiUrl.replace(/\/$/, '')}/${apiUrl.replace(/^\//, '')}`;

    console.log("api ulr = ", this.apiUrl);
  }

  // Headers optionnels pour les requêtes HTTP
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Récupérer tous les éléments
  getAll(params?: HttpParams): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(this.apiUrl, {params});
  }

  // Récupérer un élément par son ID
  getById(id: number | string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Créer un nouvel élément
  create(item: C): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.apiUrl, item, this.httpOptions);
  }

  // Mettre à jour un élément existant
  update(id: number | string, item: T): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.apiUrl}/${id}`, item, this.httpOptions);
  }

  // Supprimer un élément par son ID
  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
