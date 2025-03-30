import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../core/auth/auth.service';
import { environment } from '../../../../../environments/environment';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../../core/services/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../../core/services/role.service';
@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Password,
    Button,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  inscriptionForm: FormGroup;
  roles: { label: string; value: string }[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required]],
      motdepasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.roleService.fetchRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => console.error('Erreur lors du chargement des rôles:', err),
    });
  }

  onSubmit(): void {
    const { nom, prenom, email, numero, motdepasse, role } =
      this.inscriptionForm.value;

    this.userService
      .signUp(nom, prenom, email, numero, motdepasse, role)
      .subscribe({
        next: () => {
          // Rediriger vers la page de connexion après l'inscription réussie
          this.router.navigate(['/sign-in']);
        },
        error: (err) => console.error("Erreur lors de l'inscription:", err),
      });
  }
}
