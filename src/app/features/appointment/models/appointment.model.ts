import {Service} from '../../service/models/service.model';
import {User} from '../../../core/models/user.model';

export interface Appointment{
  _id: number | string,
  client?: User,
  description?:string,
  start: Date,
  status: AppointmentStatus,
  mechanical?: User,
  serviceTime?: number,
  services ?: Service[]
}

export interface AppointmentCreate{
  userClientId: string,
  date: Date,
  description: string,
  vehiculeId: string,
  status: AppointmentStatus,
  services: {
      serviceId: string
  }[]
}

export enum AppointmentStatus {
  PENDING = 'en attente',
  CONFIRMED = 'confirmé',
  CANCELLED = 'annulé',
}
