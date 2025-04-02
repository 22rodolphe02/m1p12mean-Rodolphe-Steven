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
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import {ApiResponse} from '../../../../core/models/response.model';
import {MessageService} from 'primeng/api';
import {Select} from 'primeng/select';
import {Role} from '../../../../core/models/user.model';
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
    Select
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  private apiUrl = environment.apiUrl;

  submitted: boolean = false;

  roles: { label: string; value: string }[] = [];
  displayError = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
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
    this.http.get<ApiResponse<{ _id: string; nom: string }[]>>(url).subscribe({
      next: (data) => {
        this.roles = data.data.map((role) => ({ label: role.nom, value: role._id }));
      },
      error: (err: HttpErrorResponse) =>{
        this.messageService.add({severity: 'error', detail: err.error.message});
      }
    });
  }

  findRole(roleId: string){
    return this.roles.filter(role => role.value === roleId)[0]
  }

  onSubmit(): void {
    this.submitted = true;
    const { email, password, role } = this.loginForm.value;
    const roleId = role;

    this.authService.login(email, password, roleId).subscribe({
      next: () => {
        console.log("salut")
        const role = this.findRole(roleId);

        console.log("role ==== ", role.label === Role.MECHANICAL)

        this.submitted = false;
        if (Role.CLIENT === role.label){
          this.router.navigate(['/user-space/client'])
        }else if(Role.ADMIN === role.label){
          this.router.navigate(['/user-space/admin']);
        }else if(Role.MECHANICAL === role.label){
          this.router.navigate(['/user-space/mechanic'])
        }

      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', detail: err.error.message, life: 5000, summary: 'Erreur'});
        this.submitted = false;
        this.displayError = true; // Afficher le pop-up en cas d'erreur
      },
    });
  }
}
