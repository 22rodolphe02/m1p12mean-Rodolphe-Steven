export interface Vehicle{
  _id?: number | string;
  mark: string,
  addedDate: Date,
  mileage: number,
  model: string,
  immatriculation: string,
  lastVisit?: Date,
  status?: VehicleStatus
}

export enum VehicleStatus{
  OPERATIONAL = 'operationnel',
  REPARATION = 'en reparation'
}
