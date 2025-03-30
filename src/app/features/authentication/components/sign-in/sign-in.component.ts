import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import { RoleService } from '../../../../core/services/role.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    Password,
    Button,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    Dialog,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  roles: { label: string; value: string }[] = [];
  displayError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
    const { email, password, role } = this.loginForm.value;
    const roleId = role;

    this.authService.login(email, password, roleId).subscribe({
      next: () => {
        this.router.navigate(['/user-space/admin']); // Redirection après connexion réussie
        // this.router.navigate(['/sign-up']); // Redirection après connexion réussie
      },
      error: () => {
        this.displayError = true; // Afficher le pop-up en cas d'erreur
      },
    });
  }
}
