import {Service, ServiceDetail} from '../../service/models/service.model';
import {Piece, PieceDetail} from '../../pieces/models/piece.model';

export interface Invoice{
  _id: number,
  date: Date,
  statut: InvoiceStatus,
  clientId: number,
  clientName: string,
  interventionId: number,
  total: number
}

export interface InvoiceDetail{
  date: Date,
  status: InvoiceStatus,
  factureId: number,
  nomClient: string,
  emailClient: string,
  numeroClient: string,
  services: {
    details: ServiceDetail[],
    total: number,
  },
  pieces: {
    details: PieceDetail[],
    total: number
  },
  montant: number
}

export enum InvoiceStatus{
  PAID = 'payé',
  PENDING = 'non payé'
}

// export interface Invoice
