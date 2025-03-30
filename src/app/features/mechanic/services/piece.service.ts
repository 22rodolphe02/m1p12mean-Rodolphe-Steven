import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PieceService extends ResourceService<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiUrl('piece');
  }

  getNombrePieceEnRupture() {
    const url = this.apiUrl + '/findPieceRupture';
    return this.http.get<{
      success: boolean;
      data: { liste: any[]; nombre: number };
      message: string;
    }>(url);
  }
}
