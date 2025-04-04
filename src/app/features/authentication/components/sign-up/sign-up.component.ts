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
import {ApiResponse} from '../../../../core/models/response.model';
import {User} from '../../../../core/models/user.model';
import {Select} from 'primeng/select';
import {InputMask} from 'primeng/inputmask';
import {MessageService} from 'primeng/api';
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
    Select,
    InputMask,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  inscriptionForm: FormGroup;
  roles: { label: string; value: string }[] = [];

  submitted: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
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
    // this.fetchRoles();
    this.roleService.fetchRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => console.error('Erreur lors du chargement des rôles:', err),
    });
  }

  // fetchRoles(): void {
  //   const url = `${this.apiUrl}/roles`; // Récupérer les rôles pour le dropdown
  //
  //   // this.http.get<ApiResponse<{ _id: string; nom: string }[]>>(url).subscribe((value: ApiResponse<{_id: string, nom: string}[]>) => {
  //   //
  //   // })
  //
  //   this.http.get<ApiResponse<{ _id: string; nom: string }[]>>(url).subscribe({
  //     next: (data: ApiResponse<{nom: string, _id: string}[]>) => {
  //       console.log("roles = ", data)
  //       this.roles = data.data.map((role) => ({ label: role.nom, value: role._id }));
  //
  //     },
  //     error: (err) => console.error('Erreur lors de la récupération des rôles:', err),
  //   });
  // }

  onSubmit(): void {
    this.submitted = true;
    const { nom, prenom, email, numero, motdepasse, role } = this.inscriptionForm.value;

    this.userService.signUp(nom, prenom, email, numero, motdepasse, role).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', detail:'votre inscription réussie', life: 5000})
        // Rediriger vers la page de connexion après l'inscription réussie
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription:', err);
        this.messageService.add({severity: 'error', detail: 'une erreur inconnue s\'est produite', life: 4000})
      }
    });
  }
}
