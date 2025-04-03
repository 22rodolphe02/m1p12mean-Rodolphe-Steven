import { Injectable } from '@angular/core';
import {ResourceService} from '../../../core/services/resource.service';
import {Piece, PieceAdd} from '../models/piece.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PieceService extends ResourceService<Piece, PieceAdd>{

  constructor(http: HttpClient) {
    super(http);

    this.setApiUrl('piece')
  }

  updateQuantities(updates: Array<{pieceId: string, newQuantity: number}>) {
    console.log("updates === ", updates)
    return this.http.patch(`${this.apiUrl}/bulk-update`, { updates });
  }
}
