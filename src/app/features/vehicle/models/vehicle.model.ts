import {InterventionDetail} from '../../interventions/models/intervention.model';

export interface Vehicle{
  _id?: number | string;
  userId ?: string
  marque: string,
  model: string,
  annee?: string | number
  kilometrage: number,
  immatriculation: string,
  createdAt?: Date,
  lastVisit?: Date,
  status?: VehicleStatus,
}

export enum VehicleStatus{
  OPERATIONAL = 'operationnel',
  REPARATION = 'en reparation'
}

export interface VehicleDetail{
  info: Vehicle,
  intervention?: InterventionDetail
}
