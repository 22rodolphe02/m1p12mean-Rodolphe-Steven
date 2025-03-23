export interface User {
  id?: number;
  nom?: string;
  prenom?: string,
  motdepasse?: string,
  numero?: string,
  email: string;
  registrationDate?: Date,
  token?: string; // Token JWT (optionnel)
}

// export interface UserLogin{
//
// }
//
// export interface UserRegistration{
//   nom: string,
//   prenom: string,
//   motdepasse: string,
//   numero: string,
//   email: string,
//   dateinscription: Date
// }
