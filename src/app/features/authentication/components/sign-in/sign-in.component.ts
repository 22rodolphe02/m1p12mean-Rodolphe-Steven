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
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  private apiUrl = environment.apiUrl;
  roles: { label: string; value: string }[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    const url = `${this.apiUrl}/roles`;
    console.log('URL = ' + url);
    this.http.get<{ _id: string; nom: string }[]>(url).subscribe({
      next: (data) => {
        this.roles = data.map((role) => ({ label: role.nom, value: role._id }));
        console.log('Rôles récupérés:', this.roles);
      },
      error: (err) =>
        console.error('Erreur lors de la récupération des rôles:', err),
    });
  }

  onSubmit(): void {
    const { email, password, role } = this.loginForm.value;
    const roleId = role;
    this.authService.login(email, password, roleId).subscribe(() => {
      this.router.navigate(['/sign-up']); // Rediriger après connexion
    });
  }
}
