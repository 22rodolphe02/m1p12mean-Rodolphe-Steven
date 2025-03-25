export interface Service{
  id: number,
  nom: string,
  prix: number,
  description: string,
  duree: number
}

export interface ServiceDetail{
  serviceId: number,
  nom: string,
  prix: number
  quantite: number; // Ajout d'une quantité si un service peut être répété
  montant: number; // Calculé comme prix * quantite (ou juste prix si quantite = 1)
}
