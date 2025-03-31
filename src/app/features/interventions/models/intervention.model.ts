import {Service} from '../../service/models/service.model';
import {User} from '../../../core/models/user.model';
import {Piece} from '../../pieces/models/piece.model';

export interface Intervention{
  _id: number | string,
  client?: User,
  mecanicien?: User,
  status: InterventionStatus,
  estimateTime: Date | number,
  services?: ServicePerformed[],
  pieces: PiecePerformed[]
}

export enum InterventionStatus {
  PENDING = 'en attente',
  DONE = 'terminé',
  IN_PROGRESS = 'en cours',
  BILLED = 'facturée',
  PAID = 'payé'
}

export interface PiecePerformed extends Piece{
  quantite: number
}

export enum ServicePerformedStatus{
  IN_PROGRESS = 'en cours',
  DONE = 'terminé'
}

export interface ServicePerformed extends Service{
  etat: ServicePerformedStatus
}
