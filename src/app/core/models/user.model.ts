export interface User {
  _id?: number | string;
  name: string;
  firstName: string,
  password?: string,
  email: string;
  registrationDate: Date,
  token: string; // Token JWT (optionnel)
  role: Role,
  roleId?: string,
}

export enum Role{
  ADMIN = 'admin',
  CLIENT = 'client',
  MECHANICAL = 'mechanic'
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
