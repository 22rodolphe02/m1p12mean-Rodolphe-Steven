export interface Piece{
  _id?: number | string,
  nom: string,
  prixunitaire: number,
  quantite: number,
}

export interface PieceAdd {
  nom: string,
  prixunitaire: number,
  quantite: number,
}

export interface PieceDetail {
  _id: number | string,
  nom: string,
  prixunitaire: number
  quantite: number;
  montant: number; // Calculé comme prixunitaire * quantite
}
