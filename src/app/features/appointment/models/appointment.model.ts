import {Service} from '../../service/models/service.model';

export interface Appointment{
  _id: number,
  name?: string,
  clientName?: string,
  description?:string,
  start: Date,
  end: Date,
  status: AppointmentStatus,
  mechanical?: string,
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
