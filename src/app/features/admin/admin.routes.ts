import {Routes} from '@angular/router';
import {clientRoutes} from '../client/client.routes';
import {planningRoutes} from '../appointment/planning.routes';
import {serviceRoutes} from '../service/service.routes';
import {mechanicRoutes} from '../mechanic/mechanic.routes';
import {vehicleRoutes} from '../vehicle/vehicle.routes';

const ClientDetailComponent = () =>
  import('../admin/pages/client-details-page/client-details-page.component').then(m => m.ClientDetailsPageComponent);

const InterventionHistory = () =>
  import('../interventions/pages/intervention-history/intervention-history.component').then(m => m.InterventionHistoryComponent);

const ClientDetailsInvoiceListPageComponent = () =>
  import('../admin/pages/client-invoices-page/client-invoices-page.component').then(m => m.ClientInvoicesPageComponent);


const InvoiceDetailsPageComponent = () =>
  import('../invoice/pages/invoice-details-page/invoice-details-page.component').then(m => m.InvoiceDetailsPageComponent);

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
    children: [
      {
        path: '', loadComponent: () =>
          import('../admin/pages/client-list-page/client-list-page.component').then(c => c.ClientListPageComponent),
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            loadComponent: ClientDetailComponent,
            children: [
              {
                path: 'vehicles',
                children: vehicleRoutes,
              },
              {
                path: 'interventions-history',
                loadComponent: InterventionHistory
              },
              {
                path: 'invoices',
                children: [
                  {
                    path: '',
                    loadComponent: ClientDetailsInvoiceListPageComponent
                  },
                  {
                    path: ':id',
                    loadComponent: InvoiceDetailsPageComponent
                  },
                ]
              },
              {
                path: '',
                pathMatch: "full",
                redirectTo: 'vehicles'
              }
            ]
          }
        ]
      }
    ]
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
