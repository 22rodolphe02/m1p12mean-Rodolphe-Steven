import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import {Password} from "primeng/password";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../../../../core/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {Select} from 'primeng/select';
import {InputMask} from 'primeng/inputmask';

@Component({
  selector: 'app-sign-up',
  imports: [
    Button,
    InputText,
    Password,
    ReactiveFormsModule,
    RouterLink,
    Select,
    InputMask
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  inscriptionForm: FormGroup;

  roles: string[] = [
    "Admin",
    "Mécanicien",
    "Client"
  ]

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {

    console.log("form value = ", this.inscriptionForm.value)

    if (this.inscriptionForm.valid) {
      const { email, password } = this.inscriptionForm.value;
      this.authService.login(email, password).subscribe(() => {
        this.router.navigate(['/']); // Rediriger vers la page d'accueil après connexion
      });
    }
  }
}
