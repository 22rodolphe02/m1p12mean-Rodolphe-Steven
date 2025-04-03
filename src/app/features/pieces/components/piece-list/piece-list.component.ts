import {Component, input} from '@angular/core';
import {Piece} from '../../models/piece.model';
import {CurrencyPipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'g-piece-list',
  imports: [
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent {
  pieces = input.required<Piece[]>()
}
