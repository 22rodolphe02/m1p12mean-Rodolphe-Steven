export interface Piece{
  pieceId: number,
  nom: string,
  prixUnitaire: number,
  quantite: number,
}

export interface PieceDetail {
  pieceId: number,
  nom: string,
  prixUnitaire: number
  quantite: number;
  montant: number; // Calculé comme prixUnitaire * quantite
}
