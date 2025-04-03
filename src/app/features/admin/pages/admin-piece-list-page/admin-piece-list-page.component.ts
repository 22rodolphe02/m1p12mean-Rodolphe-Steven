import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {AppointmentListComponent} from '../../../appointment/components/appointment-list/appointment-list.component';
import {AsyncPipe, CurrencyPipe, DecimalPipe} from '@angular/common';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {PieceService} from '../../../pieces/services/piece.service';
import {catchError, debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Vehicle} from '../../../vehicle/models/vehicle.model';
import {Piece} from '../../../pieces/models/piece.model';
import {tap} from 'rxjs/operators';
import {PieceListComponent} from '../../../pieces/components/piece-list/piece-list.component';
import {PieceAddComponent} from '../../../pieces/components/piece-add/piece-add.component';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'g-admin-piece-list-page',
  imports: [
    Button,
    RouterLink,
    AppointmentListComponent,
    AsyncPipe,
    LoaderComponent,
    PaginationComponent,
    PieceListComponent,
    PieceAddComponent,
    CurrencyPipe,
    DecimalPipe,
    InputNumber,
    FormsModule
  ],
  templateUrl: './admin-piece-list-page.component.html',
  styleUrl: './admin-piece-list-page.component.scss'
})
export class AdminPieceListPageComponent {

  pieces$ !: Observable<ApiResponse<Piece[]>>; // Observable géré par AsyncPipe
  loading: boolean = true;

  adding: boolean = false;

  currentPage = 1;

  private updateQueue = new Subject<any>();
  private pendingUpdates: {pieceId: string, newQuantity: number}[] = [];

  pieceSelected?: Piece

  constructor(private pieceService: PieceService) {
    this.loadPieces();
    this.setupUpdateListener();
  }

  loadPieces(){
    this.pieces$ = this.pieceService.getAll(undefined, {index: this.currentPage, limit: 10}).pipe(
      tap(value => {
        // console.log("valll ==== ", value)
      }),
      catchError((err, caught) => {
        throw err;
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }


  onPageChange(index: number) {
    this.currentPage = index;
    this.loadPieces();
  }

  addingMode() {
    this.adding = true;
  }

  isAddingMode(success: boolean){
    this.loadPieces();
    this.adding = !success;
  }

  setupUpdateListener() {
    // Débounce de 1 seconde - regroupe les modifications rapides
    this.updateQueue.pipe(
      debounceTime(1000),
      switchMap(() => {
        const updates = [...this.pendingUpdates];
        this.pendingUpdates = [];
        return this.sendBulkUpdates(updates);
      })
    ).subscribe();
  }

  onQuantityChange(piece: any) {
    // Ajoutez à la file d'attente
    this.pendingUpdates = this.pendingUpdates.filter(u => u.pieceId !== piece._id);
    this.pendingUpdates.push({pieceId: piece._id, newQuantity: piece.quantite});

    // Déclenche le debounce
    this.updateQueue.next(null);
  }

  sendBulkUpdates(updates: Array<{pieceId: string, newQuantity: number}>) {
    // Implémentez votre appel API ici pour mettre à jour en lot
    return this.pieceService.updateQuantities(updates);
  }

  edit(piece: Piece){
    this.pieceSelected = piece;
    this.adding = true;
  }
}
