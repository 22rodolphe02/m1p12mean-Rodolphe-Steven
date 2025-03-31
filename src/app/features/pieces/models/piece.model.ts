export interface Piece{
  _id: number | string,
  nom: string,
  prixUnitaire: number,
  quantite: number,
}

export interface PieceDetail {
  _id: number | string,
  nom: string,
  prixUnitaire: number
  quantite: number;
  montant: number; // Calculé comme prixUnitaire * quantite
}
