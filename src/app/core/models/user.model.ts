export interface User {
  _id?: number | string;
  nom: string;
  prenom: string,
  motdepasse: string,
  email: string;
  registrationDate: Date,
  token: string; // Token JWT (optionnel)
  role: Role,
}

export enum Role{
  ADMIN = 'admin',
  CLIENT = 'client',
  MECHANICAL = 'mecanicien'
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
