import { Routes } from '@angular/router';
import {adminRoutes} from './features/admin/admin.routes';
import {clientRoutes} from './features/client/client.routes';
import {Role} from './core/models/user.model';
import {AuthGuard} from './core/auth/auth.guard';
import {mechanicRoutes} from './features/mechanic/mechanic.routes';
import {invoiceRoutes} from './features/invoice/invoice.routes';


const loadLayoutComponent = () =>
  import('./shared/components/layout/layout.component').then(m => m.LayoutComponent);

const InterventionDetailsPageComponent = () =>
  import('./features/interventions/pages/intervention-details-page/intervention-details-page.component')
    .then(m => m.InterventionDetailsPageComponent);

const AppointmentDetailsPageComponent = () =>
  import('./features/appointment/pages/appointment-details-page/appointment-details-page.component')
    .then(m => m.AppointmentDetailsPageComponent);


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', loadComponent: () =>
      import('./features/authentication/components/sign-in/sign-in.component').then(c => c.SignInComponent)
  },
  {
    path: 'sign-up', loadComponent: () =>
      import('./features/authentication/components/sign-up/sign-up.component').then(c => c.SignUpComponent)
  },
  {
    path: 'user-space',
    loadComponent: loadLayoutComponent,
    data: {roles: [Role.ADMIN, Role.MECHANICAL, Role.CLIENT]},
    canActivate: [AuthGuard],
    children: [
      {
        path: 'interventions',
        loadChildren: () => [
          {
            path: ':interventionId',
            loadComponent: InterventionDetailsPageComponent
          }
        ]
      },
      {
        path: 'invoices',
        loadChildren: () => invoiceRoutes,
        data: {roles: [Role.CLIENT, Role.ADMIN]},
        canActivate: [AuthGuard]
      },
      {
        path: 'appointments',
        loadChildren: () => [
          {
            path: ':appointmentId',
            loadComponent: AppointmentDetailsPageComponent
          }
        ]
      },
      {
        path: 'admin',
        loadChildren: () => adminRoutes,
        data: { roles: [Role.ADMIN]},
        canActivate: [AuthGuard]
      },
      {
        path: 'client',
        loadChildren: () => clientRoutes,
        data: {roles: [Role.CLIENT]},
        canActivate: [AuthGuard]
      },
      {
        path: 'mechanic',
        loadChildren: () => mechanicRoutes,
        data: {roles: [Role.MECHANICAL]},
        canActivate: [AuthGuard]
      }

    ]
  }
];
