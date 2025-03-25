import {Routes} from '@angular/router';
import {clientRoutes} from '../client/client.routes';
import {planningRoutes} from '../appointment/planning.routes';
import {serviceRoutes} from '../service/service.routes';
import {mechanicRoutes} from '../mechanic/mechanic.routes';

export const adminRoutes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', loadComponent: () =>
      import('./pages/admin-dashboard-page/admin-dashboard-page.component').then(c => c.AdminDashboardPageComponent)
  },

  {
    path: 'clients',
    loadChildren: () => clientRoutes
  },
  {
    path: 'appointments',
    loadChildren: () => planningRoutes
  },
  {
    path: 'services',
    loadChildren: () => serviceRoutes
  },
  {
    path: 'mechanics',
    loadChildren: () => mechanicRoutes
  },
];
