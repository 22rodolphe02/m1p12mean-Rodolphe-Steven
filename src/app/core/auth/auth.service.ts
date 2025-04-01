import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Role, User} from '../models/user.model';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(email: string, password: string, roleId: string): Observable<User> {
    // let user!: User

    // this.currentUserSubject.next(user); // Mettre à jour l'utilisateur courant
    // localStorage.setItem('currentUser', JSON.stringify(user));

    return this.http
      .post<any>(`${this.apiUrl}/users/login`, { email, password, roleId })
      .pipe(
        map(response => {
          const user : User = {
            _id: response._id,
            name: response.nom,
            firstName: response.firstName,
            email: response.email,
            registrationDate: new Date(response.createdAt),
            role: this.mapRole(response.roleId?.nom),
            roleId: response.roleId.roleId,
            token: '',
          }
          this.currentUserSubject.next(user); // Mettre à jour l'utilisateur courant
          localStorage.setItem('currentUser', JSON.stringify(user)); // Stocker l'utilisateur dans le localStorage
          return user
        })

      );
  }

  private mapRole(roleName: string): Role {
    switch(roleName?.toLowerCase()) {
      case 'admin': return Role.ADMIN;
      case 'mechanic': return Role.MECHANICAL;
      default: return Role.CLIENT;
    }
  }

  getRole(): Role{

    const user: User = JSON.parse(<string>localStorage.getItem('currentUser'))

    console.log("current user === ", user.role)

    return user.role
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('currentUser'); // Supprimer l'utilisateur du localStorage
    this.currentUserSubject.next(null); // Mettre à jour l'utilisateur courant
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value; // Retourne true si l'utilisateur est connecté
  }

  // Méthode pour récupérer l'utilisateur courant
  getCurrentUser(): User | null {
    const user: User = JSON.parse(<string>localStorage.getItem('currentUser'))
    return user;
  }
}
