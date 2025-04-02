import {Service} from '../../service/models/service.model';
import {User} from '../../../core/models/user.model';
import {Piece} from '../../pieces/models/piece.model';
import {Vehicle} from '../../vehicle/models/vehicle.model';

export interface Intervention{
  _id: number | string,
  client?: User,
  mecanicien?: User,
  vehicle?: Vehicle,
  status: InterventionStatus,
  estimateTime: number,
  services?: ServicePerformed[],
  pieces: PiecePerformed[]
}

export interface InterventionDetail{
  _id: number | string,
  status: InterventionStatus,
  vehicle: Vehicle,
  client: User,
  mechanical: User,
  estimateTime: number,
  services: ServicePerformed[],
  pieces: PiecePerformed[]
}

export enum InterventionStatus {
  PENDING = 'en attente',
  DONE = 'terminee',
  IN_PROGRESS = 'en cours',
  PAID = 'payé'
}

export interface PiecePerformed extends Piece{
  quantite: number
}

export enum ServicePerformedStatus{
  IN_PROGRESS = 'en cours',
  DONE = 'fini'
}

export interface ServicePerformed extends Service{
  etat: ServicePerformedStatus
}
