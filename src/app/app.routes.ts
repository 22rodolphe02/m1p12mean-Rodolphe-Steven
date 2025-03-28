import { Routes } from '@angular/router';
import {adminRoutes} from './features/admin/admin.routes';
import {clientRoutes} from './features/client/client.routes';
import {planningRoutes} from './features/appointment/planning.routes';
import {serviceRoutes} from './features/service/service.routes';
import {mechanicRoutes} from './features/mechanic/mechanic.routes';
import {Role} from './core/models/user.model';
import {AuthGuard} from './core/auth/auth.guard';


const loadLayoutComponent = () =>
  import('./shared/components/layout/layout.component').then(m => m.LayoutComponent);

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in', loadComponent: () =>
      import('./features/authentication/components/sign-in/sign-in.component').then(c => c.SignInComponent)
  },
  {
    path: 'sign-up', loadComponent: () =>
      import('./features/authentication/components/sign-up/sign-up.component').then(c => c.SignUpComponent)
  },
  {
    path: 'user-space',
    loadComponent: loadLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => adminRoutes,
        data: { roles: [Role.ADMIN]},
        // canActivate: [AuthGuard]
      },
      {
        path: 'client',
        loadChildren: () => clientRoutes
      }

    ]
  }
];
