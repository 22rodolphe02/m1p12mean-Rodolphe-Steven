export interface Intervention{
  id: number,
  clientName: string,
  mechanicName: string,
  status: InterventionStatus,
  estimateTime: Date
}

export enum InterventionStatus {
  PENDING = 'en attente',
  DONE = 'terminé',
  IN_PROGRESS = 'en cours',
  BILLED = 'facturée',
  PAID = 'payé'
}
